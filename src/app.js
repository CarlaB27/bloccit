const express = require("express");
const app = express();

const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");
appConfig.init();
routeConfig.init(app);

app.use("/marco", (req, res, next) => {
	res.send("polo");
});

module.exports = app;