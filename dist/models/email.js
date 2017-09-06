'use strict';

module.exports = function (sequelize, DataTypes) {
  var Emails = sequelize.define('Emails', {
    email: DataTypes.STRING
  });
  return Emails;
};