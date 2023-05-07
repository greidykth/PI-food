/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe1 = {
  name: "Fried Anchovies with Sage",
  image: "https://spoonacular.com/recipeImages/1-556x370.jpg",
  summary:
    "You can never have too many Chinese recipes, so give Cauliflower, Brown Rice, and Vegetable Fried Rice a try. This recipe serves 8 and costs $1.12 per serving.",
  healthScore: 75,
  diets: [1, 2, 3],
  procedure: [
    {
      number: 1,
      step: "Remove the cauliflower's tough stem and reserve for another use. Using a food processor, pulse cauliflower florets until they resemble rice or couscous. You should end up with around four cups of cauliflower rice.",
    },
    {
      number: 2,
      step: "Heat 1T butter and 1T oil in a large skillet over medium heat.",
    },
  ],
};
const recipe2 = {
  name: "Anchovies Appetizer With Breadcrumbs & Scallions",
  image: "https://spoonacular.com/recipeImages/100-556x370.jpg",
  summary:
    "You can never have too many Chinese recipes, so give Cauliflower, Brown Rice, and Vegetable Fried Rice a try. This recipe serves 8 and costs $1.12 per serving.",
  healthScore: 90,
  diets: [1, 3],
  procedure: [
    {
      number: 1,
      step: "Remove the cauliflower's tough stem and reserve for another use. Using a food processor, pulse cauliflower florets until they resemble rice or couscous. You should end up with around four cups of cauliflower rice.",
    },
    {
      number: 2,
      step: "Heat 1T butter and 1T oil in a large skillet over medium heat.",
    },
  ],
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => {
      Recipe.create(recipe1);
    })
  );

  describe("GET /recipes", () => {
    it("should get status 200 and an array", async () => {
      const response = await agent.get("/recipes");
      expect(response.statusCode).to.be.equal(200);
      expect(response.body).to.be.an("array");
    });
  });

  describe("GET /recipes?name", () => {
    let response;
    beforeEach(async () => {
      response = await agent.get("/recipes?name=ancho");
    });

    it("should get an array with at least one object", async () => {
      expect(response.statusCode).to.be.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.greaterThan(0);
    });

    it("should return an array with one object with id, name, diets, image, healthScore, and createdOnDB properties", async () => {
      expect(response.body[0]).to.have.all.keys([
        "id",
        "name",
        "diets",
        "image",
        "healthScore",
        "createdOnDB",
      ]);
    });
  });

  describe("GET /recipes/:id from database", () => {
    let response;
    beforeEach(async () => {
      response = await agent.get("/recipes/1");
    });

    it("should return a recipe from database", async () => {
      expect(response.statusCode).to.be.equal(200);
      expect(response.body).to.be.an.instanceof(Object);
    });
    it("should return one object with id, name, diets, image, healthScore, and createdOnDB properties", async () => {
      expect(response.body).to.have.all.keys([
        "id",
        "name",
        "diets",
        "image",
        "healthScore",
        "summary",
        "procedure",
        "createdOnDB",
      ]);
      expect(response.body).to.have.property(
        "name",
        "Fried Anchovies with Sage"
      );
      expect(response.body).to.have.property("createdOnDB", true);
    });
  });

  describe("GET /recipes/:id from api", () => {
    let response;
    beforeEach(async () => {
      response = await agent.get("/recipes/A716426");
    });

    it("should return a recipe from api", async () => {
      expect(response.statusCode).to.be.equal(200);
      expect(response.body).to.be.an.instanceof(Object);
    });
    it("should return one object with id, name, diets, image, healthScore, summary and createdOnDB properties", async () => {
      expect(response.body).to.have.all.keys([
        "createdOnDB",
        "diets",
        "healthScore",
        "id",
        "image",
        "name",
        "procedure",
        "summary",
      ]);
      expect(response.body).to.have.property(
        "name",
        "Cauliflower, Brown Rice, and Vegetable Fried Rice"
      );
      expect(response.body).to.have.property("createdOnDB", false);
    });
  });

  describe("POST /recipes", () => {
    it("should create a recipe and get status 201 and an object", async () => {
      const response = await agent.post("/recipes").send(recipe2);
      expect(response.statusCode).to.be.equal(201);
      expect(response.body).to.be.an.instanceof(Object);
      expect(response.body).to.have.property(
        "name",
        "Anchovies Appetizer With Breadcrumbs & Scallions"
      );
    });

    it("should return an error when an empty object is sent", async () => {
      const response = await agent.post("/recipes").send({});
      expect(response.statusCode).to.be.equal(400);
      expect(response.error.text).to.be.equal(
        '{"error":"Missing data for recipe"}'
      );
    });
  });
});
