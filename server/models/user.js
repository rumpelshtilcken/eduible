module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    facebookEmail: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    facebookToken: DataTypes.STRING,
    facebookName: DataTypes.STRING,
    googleEmail: DataTypes.STRING,
    googleId: DataTypes.STRING,
    googleToken: DataTypes.STRING,
    googleName: DataTypes.STRING,
    verificationCode: DataTypes.STRING,
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    tempPassword: DataTypes.STRING
  });
  return User;
};
