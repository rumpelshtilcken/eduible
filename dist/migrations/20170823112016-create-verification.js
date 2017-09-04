'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return [queryInterface.addColumn('Users', 'verificationCode', { type: Sequelize.STRING }), queryInterface.addColumn('Users', 'verified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })];
  },
  down: function down(queryInterface) {
    return [queryInterface.removeColumn('Users', 'verificationCode'), queryInterface.removeColumn('Users', 'verified')];
  }
};