module.exports = {
    init(app) {
        const staticRoutes = require("../routes/static");
        const topicsRoutes = require("../routes/topics");
        const postRoutes = require("../routes/posts");
        const userRoutes = require("../routes/users");
        app.use(staticRoutes);
        app.use(topicsRoutes);
        app.use(postRoutes);
        app.use(userRoutes);
    }
}