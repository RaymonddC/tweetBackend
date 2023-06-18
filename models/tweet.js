'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tweet.hasMany(models.Tweet, {
        foreignKey: 'reply_id',
      });
      Tweet.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      Tweet.hasMany(models.LikeTweet, {
        foreignKey: 'tweet_id',
      });
    }
  }
  Tweet.init(
    {
      media: DataTypes.STRING,
      caption: DataTypes.STRING,
      viewed: { type: DataTypes.INTEGER, defaultValue: 0 },
      reply_id: DataTypes.INTEGER,
      user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Tweet',
    }
  );
  return Tweet;
};
