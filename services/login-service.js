const con = require("../config/dbConfig");
const mysql = require("mysql");
const { createClient } = require("redis");
const client = createClient();

(async () => {
  client.on("error", (error) => console.error(`${error}`));

  await client.connect();
})();

module.exports = {
  getLogin: async (msg, response) => {
    console.log(msg);
  },
};
