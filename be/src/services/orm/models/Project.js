const Sequelize = require('sequelize');
const validator = require('validator');

module.exports = (sequelize, Sequelize) => {
  const model = {
    userId: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    host: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
  };
  const sequelizeModel = sequelize.define('project', model);

  return sequelizeModel;
};
