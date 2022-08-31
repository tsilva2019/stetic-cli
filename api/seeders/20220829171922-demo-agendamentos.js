'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Agendamentos', [
      {
        cliente_id:1,
        data_agendamento: new Date(),
        hora_agendamento: '10:00',
        status: 'confirmado',
        createdAt: new Date(),
        updatedAt: new Date(),
     },
     {
        cliente_id:6,
        data_agendamento: new Date(),
        hora_agendamento: '11:00',
        status: 'pendente',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        cliente_id:1,
        data_agendamento: new Date(),
        hora_agendamento: '13:00',
        status: 'confirmado',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        cliente_id:6,
        data_agendamento: new Date(),
        hora_agendamento: '14:00',
        status: 'pendente',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('People', null, {});

  }
};
