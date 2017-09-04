'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    facebookEmail: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    facebookToken: DataTypes.STRING,
    facebookName: DataTypes.STRING,
    verificationCode: DataTypes.STRING,
    verified: { type: DataTypes.BOOLEAN, defaultValue: false }
  });
  return User;
};