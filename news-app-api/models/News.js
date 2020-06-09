module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define(
    "News",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(11)
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(200)
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
      tableName: "news",
      paranoid: true
    }
  );

  News.associate = function(models) {
    News.hasMany(models.NewsArticle, { foreignKey: "newsId" });
  };

  News.getNews = function(params) {
    const whereClause = {};
    const paginationParams = {};

    if (params.articleTypeId) {
      whereClause.articleTypeId = params.articleTypeId;
    }

    if (params.id) {
      whereClause.newsId = params.id;
    }

    if (params.limit) {
      paginationParams.limit = params.limit;
    }

    if (params.offset) {
      paginationParams.offset = params.offset;
    }

    console.log("params", params);
    console.log("paginationParams", paginationParams);

    return News.findAndCountAll({
      attributes: { exclude: ["deleted"] },
      subQuery: false,
      include: [
        {
          model: sequelize.models.NewsArticle,
          attributes: ["id", "articleTypeId", "description"],
          include: [
            {
              model: sequelize.models.ArticleType,
              attributes: ["id", "title"],
              required: true
            }
          ],
          required: true,
          where: whereClause
        }
      ],
      ...paginationParams
    });
  };

  return News;
};
