const con = require("../config/dbConfig");
const mysql = require("mysql");
const { createClient } = require("redis");
const client = createClient();

(async () => {
  client.on("error", (error) => console.error(`${error}`));

  await client.connect();
})();

module.exports = {
  getUser: async (msg, response) => {
    let uid = msg.uid;
    async function cacheData() {
      let results;
      try {
        const cacheResults = await client.get(`users/${uid}`);
        if (cacheResults) {
          results = JSON.parse(cacheResults);
          response(null, {
            fromCache: true,
            data: results,
          });
        } else {
          await getUser();
        }
      } catch (err) {
        console.log(err);
        response(err, null, { code: 404 });
      }
    }

    async function getUser() {
      const pool = mysql.createPool(con);
      pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
          `SELECT * FROM users WHERE id = ${uid}`,
          async (err, rows) => {
            connection.release();
            if (!err) {
              if (rows.length === 0) {
                response(null, { fromCache: false, data: "No Data" });
                return;
              }
              await client.set(`users/${uid}`, JSON.stringify(rows), {
                EX: 300,
                NX: true,
              });

              response(null, { fromCache: false, data: rows });
              console.log("Request sent to the API");
            } else {
              console.log(err);
              response(err, null, { code: 404 });
            }
          }
        );
      });
    }
    await cacheData();
  },
};
