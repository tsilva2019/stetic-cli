'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Pessoas', 'ativo', {
        type: Sequelize.BOOLEAN
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pessoas', 'ativo');
  }
};