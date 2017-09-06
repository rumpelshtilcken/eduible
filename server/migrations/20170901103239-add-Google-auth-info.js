module.exports = {
  up(queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Users', 'googleEmail', { type: Sequelize.STRING }),
      queryInterface.addColumn('Users', 'googleId', { type: Sequelize.STRING }),
      queryInterface.addColumn('Users', 'googleToken', { type: Sequelize.STRING }),
      queryInterface.addColumn('Users', 'googleName', { type: Sequelize.STRING })
    ];
  },
  down(queryInterface) {
    return [
      queryInterface.removeColumn('Users', 'googleEmail'),
      queryInterface.removeColumn('Users', 'googleId'),
      queryInterface.removeColumn('Users', 'googleToken'),
      queryInterface.removeColumn('Users', 'googleName')
    ];
  }
};
