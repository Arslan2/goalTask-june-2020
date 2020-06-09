module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("article_types", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      key: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(200)
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
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("article_types");
  }
};
