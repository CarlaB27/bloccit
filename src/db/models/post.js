'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function (models) {
    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments"
    });
    Post.hasMany(models.Vote, {
      foreignKey: "postId",
      as: "votes"
    });
    Post.hasMany(models.Flair, {
      foreignKey: "postId",
      as: "flairs"
    });
  };


  //Write a test for the getPoints method of the Post model.
  Post.prototype.getPoints = function () {
    if (this.votes.length === 0) return 0
    return this.votes
      .map((v) => { return v.value })
      .reduce((prev, next) => { return prev + next })
  };

  //Write a test for a method called hasUpvoteFor(). 
  //We will call this method on a Post object with userId as 
  //an argument. It returns true if the user with the matching
  // userId has an upvote for the post. Implement the method.
  Post.prototype.hasUpvoteFor = function (userId) {
    let answer = this.votes.filter(vote => this.vote.userId === userId);
    if (answer.value === 1) {
      return true;
    } else {
      return false;
    }
  };
  //Write a test for a method called hasDownvoteFor(). 
  //We will call this method on a Post object with userId 
  //as an argument. It returns true if the user with the 
  //matching userId has a downvote for the post. Implement the method.
  Post.prototype.hasDownvoteFor = function (userId) {
    let answer = this.votes.filter(vote => this.vote.userId === userId);
    if (answer.value === -1) {
      return true;
    } else {
      return false;
    }
  };


  return Post;
};