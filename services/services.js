const seneca = require("seneca")({
  transport: {
    type: "web",
    port: 3001,
  },
  log: "silent",
});

const usersService = require("./users-service");
const userService = require("./user-service");
const loginService = require("./login-service");

seneca.add({ role: "api", cmd: "users" }, usersService.getUsers);

seneca.add({ role: "api", cmd: "users/:uid" }, userService.getUser);

seneca.add({ role: "api", cmd: "login" }, loginService.getLogin);

module.exports = seneca;
