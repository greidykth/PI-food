/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, Diet, conn } = require("../../src/db.js");
const {
  getDietsFromApi,
} = require("../../src/controllers/dietsControllers.js");

const agent = session(app);

describe("Diet routes", () => {
  before(() => {
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  });

  let response;

  beforeEach(() =>
    Diet.sync({ force: true }).then(async () => {
      await getDietsFromApi();
      response = await agent.get("/diets");
    })
  );

  describe("GET /diets", () => {
    it("should get status 200 and an array", async () => {
      expect(response.statusCode).to.be.equal(200);
      expect(response.body).to.be.an("array");
    });
    it("should return an array with objects with id and name properties", async () => {
      expect(response.body).to.have.length.greaterThan(0);
      expect(response.body[0]).to.have.all.keys([
        "id",
        "name",
        "createdAt",
        "updatedAt",
      ]);
    });
    it("should return an array that contains a vegetarian diet", async () => {
      const vegetarianDiet = response.body.find((diet) => diet.name === "vegetarian");
      expect(vegetarianDiet).to.exist;
    });
  });
});
