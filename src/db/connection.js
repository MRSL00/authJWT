const Seq = require("sequelize");

const seq = new Seq("cad", "root", "1378mrsl00[]", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false
});

module.exports = seq;
