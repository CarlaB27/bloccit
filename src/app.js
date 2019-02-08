const express = require("express");
const app = express();

const routeConfig = require("./config/route-config.js");
routeConfig.init(app);

app.use("/marco", (req, res, next) => {
    res.send("polo")
});

module.exports = app;