const date = new Date();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "article_types",
      [
        { key: "sports", title: "Sports", created_at: date, updated_at: date },
        {
          key: "it",
          title: "Information Technology",
          created_at: date,
          updated_at: date
        },
        {
          key: "cs",
          title: "Computer Science",
          created_at: date,
          updated_at: date
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("article_types", {
      key: ["sports", "it", "cs"]
    });
  }
};
