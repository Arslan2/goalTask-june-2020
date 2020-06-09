const _ = require("lodash");
const { News, sequelize } = require("../../models");

const CONSTANTS = {
  SPORTS: { title: "Sports" },
  INFORMATION_TECHNOLOGY: { title: "Information Technology" },
  COMPUTER_SCIENCE: { title: "Computer Science" },
  EXPECTED_RESULT_GET_NEWS: {
    count: 1,
    rows: [
      {
        title: "Sports",
        deletedAt: null,
        NewsArticles: [
          {
            description: "<p> Testing !! </p>",
            ArticleType: {
              title: "Sports"
            }
          }
        ]
      }
    ]
  },
  EXPECTED_RESULT_DELETE_NEWS: { deleted: true },
  EXPECTED_RESULT_CREATE_NEWS: { added: true }
};

const createNews = async externalData => {
  const transaction = await sequelize.transaction();
  try {
    const externalObject = _.isArray(externalData)
      ? externalData
      : [externalData];

    const result = await News.bulkCreate(externalObject, { transaction });

    await transaction.commit();
    return result;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

module.exports = {
  createNews,
  CONSTANTS
};
