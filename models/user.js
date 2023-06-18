'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Username already in use!',
        },
        allowNull: false, //emptystrin != null
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Email address already in use!',
        },
        allowNull: false,
        validate: {
          isEmail: { msg: 'Please input an email' },
        },
      },
      password: DataTypes.STRING,
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      official: { type: DataTypes.BOOLEAN, defaultValue: false },
      fullname: DataTypes.STRING,
      bio: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
