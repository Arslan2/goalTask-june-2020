const _ = require("lodash");
const { ArticleType, sequelize } = require("../../models");

const CONSTANTS = {
  SPORTS: { key: "sports", title: "Sports" },
  INFORMATION_TECHNOLOGY: { key: "it", title: "Information Technology" },
  COMPUTER_SCIENCE: { key: "cs", title: "Computer Science" },
  EXPECTED_RESULT_GET_ARTICLE_TYPES: [
    {
      key: "sports",
      title: "Sports"
    },
    {
      key: "it",
      title: "Information Technology"
    },
    {
      key: "cs",
      title: "Computer Science"
    }
  ]
};

const createArticleType = async externalData => {
  const transaction = await sequelize.transaction();
  try {
    const externalObject = _.isArray(externalData)
      ? externalData
      : [externalData];

    const result = await ArticleType.bulkCreate(externalObject, {
      transaction
    });

    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const findArticleType = async externalData => {
  try {
    let result;
    if (externalData) {
      const externalObject = _.isArray(externalData)
        ? externalData
        : [externalData];
      result = await ArticleType.findAll({ where: externalObject });
    } else {
      result = await ArticleType.findAll();
    }
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findArticleType,
  createArticleType,
  CONSTANTS
};
