module.exports = {
    init(app) {
        const staticRoutes = require("../routes/static");
        const topicsRoutes = require("../routes/topics");
        const postRoutes = require("../routes/posts");
        app.use(staticRoutes);
        app.use(topicsRoutes);
        app.use(postRoutes);
    }
}