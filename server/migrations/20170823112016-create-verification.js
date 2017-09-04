module.exports = {
  up(queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Users', 'verificationCode', { type: Sequelize.STRING }),
      queryInterface.addColumn('Users', 'verified', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    ];
  },

  down(queryInterface) {
    return [
      queryInterface.removeColumn('Users', 'verificationCode'),
      queryInterface.removeColumn('Users', 'verified')
    ];
  }
};
