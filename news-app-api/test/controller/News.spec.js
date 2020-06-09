const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiSubset = require("chai-subset");
const _ = require("lodash");
const bbPromise = require("bluebird");
const app = require("../../app");
const defaults = require("../config/defaults");
const {
  articletypesModule,
  newsarticlesModule,
  newsModule
} = require("../modules");

chai.use(chaiHttp);
chai.use(chaiSubset);

describe("News Controller", () => {
  let newsarticle = [];

  beforeEach(async () => {
    const articleTypePromise = articletypesModule.findArticleType({
      key: articletypesModule.CONSTANTS.SPORTS.key
    });
    const newPromise = newsModule.createNews(newsModule.CONSTANTS.SPORTS);
    const [news, articleType] = await bbPromise.all([
      newPromise,
      articleTypePromise
    ]);
    newsarticle = await newsarticlesModule.createNewsArticle({
      articleTypeId: _.first(articleType).id,
      description: "<p> Testing !! </p>",
      newsId: _.first(news).id
    });
  });

  it("Should get News", async () => {
    try {
      const queryParams = {
        page: 0,
        limit: 7
      };

      const res = await chai
        .request(app)
        .get(`${defaults.ROUTE_PREFIX}/news/`)
        .query(queryParams);
      chai.expect(res).to.have.status(200);
      chai.expect(res.body.rows).to.be.an("array");
      chai
        .expect(res.body)
        .containSubset(newsModule.CONSTANTS.EXPECTED_RESULT_GET_NEWS);
    } catch (error) {
      console.error(">>>>> Error in Should get News container", error);
      throw error;
    }
  });

  it("Should delete News", async () => {
    try {
      const res = await chai
        .request(app)
        .delete(`${defaults.ROUTE_PREFIX}/news/${_.first(newsarticle).id}`);

      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.be.an("object");
      chai
        .expect(res.body)
        .containSubset(newsModule.CONSTANTS.EXPECTED_RESULT_DELETE_NEWS);
    } catch (error) {
      console.error(">>>>> Error in Should delete News container", error);
      throw error;
    }
  });

  it("Should get Article Types", async () => {
    try {
      const res = await chai
        .request(app)
        .get(`${defaults.ROUTE_PREFIX}/news/types`);

      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.be.an("array");
      chai
        .expect(res.body)
        .containSubset(
          articletypesModule.CONSTANTS.EXPECTED_RESULT_GET_ARTICLE_TYPES
        );
    } catch (error) {
      console.error(">>>>> Error in Should get Article Types container", error);
      throw error;
    }
  });

  it("Should get Specific News", async () => {
    try {
      const res = await chai
        .request(app)
        .get(`${defaults.ROUTE_PREFIX}/news/${_.first(newsarticle).id}`);

      chai.expect(res).to.have.status(200);
      chai.expect(res.body.rows).to.be.an("array");
      chai
        .expect(res.body)
        .containSubset(newsModule.CONSTANTS.EXPECTED_RESULT_GET_NEWS);
    } catch (error) {
      console.error(">>>>> Error in Should get specific News container", error);
      throw error;
    }
  });

  it("Should Create News", async () => {
    try {
      const articleType = await articletypesModule.findArticleType(
        articletypesModule.CONSTANTS.INFORMATION_TECHNOLOGY
      );

      const res = await chai
        .request(app)
        .post(`${defaults.ROUTE_PREFIX}/news/`)
        .send({
          articleTypeId: _.first(articleType).id,
          description: "<p>Testing Again!!</p>",
          title: newsModule.CONSTANTS.INFORMATION_TECHNOLOGY.title
        });
      console.log("res.body", res.body);
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.be.an("object");
      chai
        .expect(res.body)
        .containSubset(newsModule.CONSTANTS.EXPECTED_RESULT_CREATE_NEWS);
    } catch (error) {
      console.error(">>>>> Error in Should create News container", error);
      throw error;
    }
  });

  it("Should Not Create News", async () => {
    try {
      const articleType = await articletypesModule.findArticleType(
        articletypesModule.CONSTANTS.INFORMATION_TECHNOLOGY
      );

      const res = await chai
        .request(app)
        .post(`${defaults.ROUTE_PREFIX}/news/`)
        .send({
          articleTypeId: _.first(articleType).id
        });
      console.log("res.body", res.body);
      chai.expect(res).to.have.status(400);
    } catch (error) {
      console.error(">>>>> Error in Should not create News container", error);
      throw error;
    }
  });
});
