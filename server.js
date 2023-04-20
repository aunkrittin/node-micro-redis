const express = require("express");
const app = express();

require("dotenv").config({ path: `./.env.local`, override: true });

const IP = process.env.IP_ADDRESS;
const PORT = process.env.PORT || 3001;

app.use("/api/v1", require("./routes/routes"));

app.listen(PORT, () => {
  console.log(`Server listening on http://${IP}:${PORT}/api/v1`);
});
