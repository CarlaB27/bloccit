module.exports = {
    init(app) {
        const staticRoutes = require("../routes/static");
        const topicsRoutes = require("../routes/topics");
        const advertisementsRoutes = require("../routes/advertisements");
        app.use(staticRoutes);
        app.use(topicsRoutes);
        app.use(advertisementsRoutes);
    }
}