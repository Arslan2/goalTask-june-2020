const controllers = require("../controllers/News");

module.exports = app => {
  app.use("/api/news", controllers);
};
