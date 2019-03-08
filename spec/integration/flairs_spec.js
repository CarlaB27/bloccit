const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/posts";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {
    beforeEach((done) => {
        this.topic;
        this.Post;
        this.Flair;
        sequelize.sync({ force: true }).then((res) => {
            Topic.create({
                title: "Favorite books",
                body: "List of favorite books"
            })
                .then((topic) => {
                    this.topic = topic;

                    Post.create({
                        title: "The classics",
                        body: "A list of classic books",
                        topicId: this.topic.id
                    })
                        .then((post) => {
                            this.post = post;
                            done();
                        })
                    Flair.create({
                        name: "Good",
                        color: "Blue",
                        postId: this.post.id
                    })
                        .then((flair) => {
                            this.flair = flair;
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                });
        });
    });

    describe("GET /posts/:postId/flairs/new", () => {
        it("should render a new flair form", (done) => {
            request.get(`${base}/${this.post.id}/flairs/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Flair");
                done();
            });
        });
    });

    describe("GET /posts/:postId/flairs/:id", () => {
        it("should render a view with the selected flair", (done) => {
            request.get(`${base}/${this.post.id}/flairs/${this.flair.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("The Classics");
                done();
            });
        });
    });

    describe("POST /posts/:postId/flairs/create", () => {
        it("should create a new flair and redirect", (done) => {
            const options = {
                url: `${base}/${this.post.id}/flairs/create`,
                form: {
                    name: "Good",
                    color: "Blue"
                }
            };
            request.flair(options,
                (err, res, body) => {
                    Flair.findOne({ where: { name: "Good" } })
                        .then((flair) => {
                            expect(flair.name).toBe("Good");
                            expect(flair.color).toBe("Blue");
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
    });

    describe("POST /posts/:postId/flairs/:id/destroy", () => {
        it("should delete the flair with the associated ID", (done) => {
            expect(this.flair.id).toBe(1);
            request.flair(`${base}/${this.post.id}/flairs/${this.flair.id}/destroy`, (err, res, body) => {
                Flair.findById(1)
                    .then((flair) => {
                        expect(err).toBeNull();
                        expect(flair).toBeNull();
                        done();
                    })
            });
        });
    });

    describe("GET /posts/:postId/flairs/:id/edit", () => {
        it("should render a view with an edit flair form", (done) => {
            request.get(`${base}/${this.post.id}/flairs/${this.flair.id}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Edit Flair");
                expect(body).toContain("Good");
                done();
            });
        });
    });

    describe("POST /posts/:postId/flairs/:id/update", () => {
        it("should update the flair with the given values", (done) => {
            const options = {
                url: `${base}${this.post.id}/flairs/${this.flair.id}/update`,
                form: {
                    name: "Good",
                    color: "Blue"
                }
            };
            request.flair(options,
                (err, res, body) => {
                    expect(err).toBeNull();
                    Flair.findOne({
                        where: { id: this.flair.id }
                    })
                        .then((flair) => {
                            expect(flair.name).toBe("Good");
                            done();
                        });
                });
        });
    });


});