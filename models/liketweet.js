'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikeTweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LikeTweet.belongsTo(models.Tweet, {
        foreignKey: 'tweet_id',
      });
      LikeTweet.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  LikeTweet.init(
    {
      tweet_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'LikeTweet',
    }
  );
  return LikeTweet;
};
