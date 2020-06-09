module.exports = (sequelize, DataTypes) => {
  const ArticleType = sequelize.define(
    "ArticleType",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(11)
      },
      key: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(200)
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
      tableName: "article_types"
    }
  );

  return ArticleType;
};
