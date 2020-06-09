module.exports = (sequelize, DataTypes) => {
  const NewsArticle = sequelize.define(
    "NewsArticle",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(11)
      },
      articleTypeId: {
        field: "article_type_id",
        allowNull: false,
        type: DataTypes.INTEGER(11)
      },
      description: {
        field: "article_description",
        allowNull: false,
        type: DataTypes.TEXT
      },
      newsId: {
        field: "news_id",
        allowNull: false,
        type: DataTypes.INTEGER(11)
      },
      deletedAt: {
        field: "deleted_at",
        allowNull: true,
        type: DataTypes.DATE
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      tableName: "news_articles",
      paranoid: true
    }
  );

  NewsArticle.associate = function(models) {
    NewsArticle.belongsTo(models.ArticleType, { foreignKey: "articleTypeId" });
  };

  return NewsArticle;
};
