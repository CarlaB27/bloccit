module.exports = {
    init(app) {
        const staticRoutes = require("../routes/static");
        const topicsRoutes = require("../routes/topics");
        const postRoutes = require("../routes/posts");
        const flairRoutes = require("../routes/flairs");
        app.use(staticRoutes);
        app.use(topicsRoutes);
        app.use(postRoutes);
        app.use(flairRoutes);
    }
}