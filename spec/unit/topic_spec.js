const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;
const Topic = require("../../src/db/models").Topic;
const User = require("../../src/db/models").User;

describe("Topic", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        this.user;
        sequelize.sync({ force: true }).then((res) => {
            User.create({
                email: "starman@tesla.com",
                password: "Trekkie4lyfe"
            })
                .then((user) => {
                    this.user = user; //store the user
                    Topic.create({
                        title: "Expeditions to Alpha Centauri",
                        description: "A compilation of reports from recent visits to the star system.",
                        posts: [{
                            title: "My first visit to Proxima Centauri b",
                            body: "I saw some rocks.",
                            userId: this.user.id
                        }]
                    },
                        {
                            include: {
                                model: Post,
                                as: "posts"
                            }
                        })
                        .then((topic) => {
                            this.topic = topic; //store the topic
                            this.post = topic.posts[0]; //store the post
                            done();
                        })
                })
        });
    });

    describe("#create()", () => {
        it("should create a topic with a title and description", (done) => {
            Topic.create({
                title: "Black cats.",
                description: "Are they bad luck?",
                topicId: this.topic.id
            })
                .then((topic) => {
                    expect(topic.title).toBe("Black cats.");
                    expect(topic.description).toBe("Are they bad luck?");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });

        it("should not create a topic with missing title or description assigned to topic", (done) => {
            Topic.create({
                title: "Black cats.",
                description: "Are they bad luck?"
            })
                .then((topic) => {
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Topic.description cannot be null");
                    //expect(err.message).toContain("Topic.topicId cannot be null");
                    done();
                })
        });
    });

    describe("#getPosts()", () => {
        it("should add a post to a topic and return the associated posts", () => {
            Post.create({
                title: "Orange striped cats.",
                body: "Are they just tiny tigers?",
                topicId: this.topic.id
            })
                .then((post) => {
                    this.topic.getPosts()
                        .then((posts) => {
                            expect(this.topic.id).toBe(post.topicId);
                            expect(this.topic.id).toBe(posts[1].topicId);
                            done();
                        });
                })
        });
    });

});