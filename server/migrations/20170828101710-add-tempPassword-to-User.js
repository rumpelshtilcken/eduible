module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'tempPassword', { type: Sequelize.STRING });
  },
  down(queryInterface) {
    return queryInterface.removeColumn('tempPassword');
  }
};
