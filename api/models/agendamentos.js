'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Agendamentos.belongsTo(models.Pessoas, {
        foreignKey: 'cliente_id'
      })
    }
  }
  Agendamentos.init({
    data_agendamento: DataTypes.DATEONLY,
    hora_agendamento: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Agendamentos',
  });
  return Agendamentos;
};