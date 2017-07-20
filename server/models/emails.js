module.exports = function(sequelize, DataTypes) {
  const Emails = sequelize.define('Emails', {
    email: DataTypes.STRING
  });
  return Emails;
};
