module.exports = function (sequelize, DataTypes) {
  const Email = sequelize.define('Email', {
    email: DataTypes.STRING
  });
  return Email;
};
