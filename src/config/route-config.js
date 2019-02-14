module.exports = {
    init(app) {
        const staticRoutes = require("../routes/static");
        const topicsRoutes = require("../routes/topics");
        app.use(staticRoutes);
        app.use(topicsRoutes);
    }
}