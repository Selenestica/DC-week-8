'use strict';
module.exports = (sequelize, DataTypes) => {
  let Comment = sequelize.define('Comment', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    username: DataTypes.STRING,
    postID: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    models.Comment.belongsTo(models.Post, {as: 'post', foreignKey: 'postID'})
  };
  return Comment;
};