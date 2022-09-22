'use strict';
const { notDeepEqual, notEqual } = require('assert');
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Agendamentos, {
        foreignKey: 'cliente_id',
        scope: {
          status: 'confirmado'
        }, 
        as: 'agendamentosConfirmado',
        scope: {
          status: 'pendente'
        },
        as: 'agendamentosPendente',
        scope: {
          status: 'cancelado'
        },
        as: 'agendamentosCancelado',
        scope: {
          status: 'concluido'
        },
        as: 'agendamentosConcluido'
      })
    }
  }
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        validaNome: function (paramsNome) {
          if(paramsNome.length < 3 ) throw new Error('O nome deve ter no mínimo 3 catacteres.');
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: { 
        isEmail: {
          args: true,
          msg: 'Dado do tipo e-mail inválido'
        }
      } 
    },
    telefone: DataTypes.STRING,
    senha: DataTypes.STRING,
    ativo:DataTypes.BOOLEAN,
    createdAt: DATE,
    updatedAt: DATE,
    deletedAt: DATE
  }, {
    sequelize,
    paranoid: true,
    defaultScope: {
      where: { ativo: true }
    },
    scopes: {
      all: {
        where: {}
      },
      deleted: {
        where: { deletedAt: true}
      }
    },
    modelName: 'Pessoas',
  });
  return Pessoas;
};