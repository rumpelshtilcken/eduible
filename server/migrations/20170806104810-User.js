module.exports = {
  up(queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Users', 'facebookEmail', { type: Sequelize.STRING }),
      queryInterface.addColumn('Users', 'facebookId', { type: Sequelize.STRING }),
      queryInterface.addColumn('Users', 'facebookToken', { type: Sequelize.STRING }),
      queryInterface.addColumn('Users', 'facebookName', { type: Sequelize.STRING })
    ];
  },
  down(queryInterface) {
    return [
      queryInterface.removeColumn('Users', 'facebookEmail'),
      queryInterface.removeColumn('Users', 'facebookId'),
      queryInterface.removeColumn('Users', 'facebookToken'),
      queryInterface.removeColumn('Users', 'facebookName')
    ];
  }
};
