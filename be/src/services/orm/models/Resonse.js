const Sequelize = require('sequelize');
const validator = require('validator');

module.exports = (sequelize, Sequelize) => {
  const model = {
    userId: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    projectId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: true,
    }
  };
  const sequelizeModel = sequelize.define('response', model);

  return sequelizeModel;
};
