const express = require("express");
const { initConfig } = require("./app/config/config");
const { initMysqlConn } = require("./app/database/mysql");
const initRoutes = require("./app/route/route");
const migrate = require("./app/migrate/migrate");

const app = express();

(async () => {
  const cfg = initConfig();
  const dbMysql = initMysqlConn(cfg);

  initRoutes(app, dbMysql);

  app.listen(cfg.SERVERPORT, () => {
    console.log(`Server is running on port ${cfg.SERVERPORT}`);
  });
})();
