module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("news_articles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      article_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      news_id: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      article_description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        )
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("news_articles");
  }
};
