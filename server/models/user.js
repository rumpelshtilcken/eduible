module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
    password: DataTypes.STRING
  });
  return User;
};
