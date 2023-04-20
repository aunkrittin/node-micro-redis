const express = require("express");
const router = express.Router();
const services = require("../services/services");

router.get("/users", (req, res) => {
  services.act({ role: "api", cmd: "users" }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error");
      return;
    }

    res.send(result);
  });
});

router.get("/users/:uid", (req, res) => {
  let uid = req.params.uid;

  services.act({ role: "api", cmd: "users/:uid", uid: uid }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: err.message });
      return;
    }

    res.send(result);
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  services.act(
    { role: "api", cmd: "login", params: { email: email, password: password } },
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
        return;
      }

      res.send(result);
    }
  );
});

module.exports = router;
