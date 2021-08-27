const Seq = require("sequelize");

const seq = new Seq("cad", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false
});

module.exports = seq;
