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
    url: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    url2: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    responseType: {
      type: Sequelize.STRING(11),
      allowNull: true,
    },
    responses: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
  };
  const sequelizeModel = sequelize.define('interface', model);

  return sequelizeModel;
};
