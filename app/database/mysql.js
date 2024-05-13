const { Sequelize } = require("sequelize");
const User = require("../../feature/user/model/model");

function initMysqlConn(config) {
  const sequelize = new Sequelize(config.DBNAME, config.DBUSER, config.DBPASS, {
    host: config.DBHOST,
    port: config.DBPORT,
    dialect: "mysql",
    logging: true,
    define: {
      timestamps: false,
    },
  });

  return sequelize;
}


module.exports = { initMysqlConn };
