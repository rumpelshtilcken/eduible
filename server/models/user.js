module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    local: {
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    facebook: {
      id: String,
      token: String,
      email: String,
      name: String
    }
  });
  return User;
};
