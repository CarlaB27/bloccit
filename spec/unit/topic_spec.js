const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({ force: true }).then((res) => {
            Topic.create({
                title: "Cats are fine.",
                description: "It's all about cats."
            })
                .then((topic) => {
                    this.topic = topic;
                    Topic.create({
                        title: "How to pet a cat.",
                        description: "Do not start with the belly.",
                        topicId: this.topic.id
                    })
                        .then((topic) => {
                            this.topic = topic;
                            done();
                        });
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
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
