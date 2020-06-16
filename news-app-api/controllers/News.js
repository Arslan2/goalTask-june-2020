const express = require("express");

const router = express.Router();
const bbPromise = require("bluebird");
const { ArticleType, NewsArticle, News, sequelize } = require("../models");

function publishMessage(message, type) {
  process.pubNubInstace.publish(
    {
      message,
      channel: `news-system-${type}`,
      sendByPost: false, // true to send via post
      storeInHistory: false, // override default storage options
      meta: {
        cool: "meta"
      } // publish extra meta with the request
    },
    function(status, response) {
      if (status.error) {
        // handle error
        console.log(status);
      } else {
        console.log("message Published w/ timetoken", response.timetoken);
      }
    }
  );
}

router.get("/types", async (req, res) => {
  res.json(await ArticleType.findAll());
});

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit, 10);
  const page = parseInt(req.query.page, 10);
  const params = {
    ...req.query,
    limit: limit && limit > 0 ? limit : 1,
    offset: page && page > 0 ? (page - 1) * limit : 0
  };

  const result = await News.getNews(params);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    await bbPromise.all([
      News.destroy(
        {
          where: {
            id: req.params.id
          }
        },
        { transaction }
      ),

      NewsArticle.destroy(
        {
          where: {
            newsId: req.params.id
          }
        },
        { transaction }
      )
    ]);

    await transaction.commit();
    publishMessage(
      `New ID:${req.params.id} has successfully delted !!`,
      "success"
    );
    res.json({ deleted: true });
  } catch (err) {
    await transaction.rollback();
    publishMessage(`>>>>> Error: ${err}`, "error");
    throw err;
  }
});

router.get("/:id", async (req, res) => {
  const result = await News.getNews({ ...req.params });
  res.json(result);
});

router.post("/", async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.articleTypeId) {
    const errorMessage = "Missing Attributes";
    res.status(400).send(errorMessage);
    publishMessage(`>>>>> Error: ${errorMessage}`, "error");
  }

  const transaction = await sequelize.transaction();
  try {
    const addedNews = await News.create(
      {
        title: req.body.title
      },
      { transaction }
    );

    await NewsArticle.create(
      {
        newsId: addedNews.id,
        articleTypeId: req.body.articleTypeId,
        description: req.body.description
      },
      { transaction }
    );

    await transaction.commit();
    publishMessage(`${req.body.title} has successfully created !!`, "success");
    res.json({ added: true });
  } catch (err) {
    await transaction.rollback();
    publishMessage(`>>>>> Error: ${err}`, "error");
    throw err;
  }
});

module.exports = router;
