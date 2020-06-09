const _ = require("lodash");
const { NewsArticle, sequelize } = require("../../models");

const createNewsArticle = async externalData => {
  const transaction = await sequelize.transaction();
  try {
    const externalObject = _.isArray(externalData)
      ? externalData
      : [externalData];

    const result = await NewsArticle.bulkCreate(externalObject, {
      transaction
    });

    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const findNewsArticle = async externalData => {
  try {
    let result;
    if (externalData) {
      const externalObject = _.isArray(externalData)
        ? externalData
        : [externalData];
      result = await NewsArticle.findAll({ where: externalObject });
    } else {
      result = await NewsArticle.findAll();
    }
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewsArticle,
  findNewsArticle
};
