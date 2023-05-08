const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");
const { DataTypes } = require("sequelize");

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

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Recipe.create({ name: "Milanesa a la napolitana" });
      });
    });
  });

  describe("Recipes should exist ", () => {
    it("Recipe model should exist", () => {
      const Recipe = conn.models.Recipe;
      expect(Recipe).to.exist;
    });
    it("Recipe should have the right properties", async () => {
      const recipe = await Recipe.create(recipe1);
      const keys = [
        "createdOnDB",
        "id",
        "name",
        "image",
        "summary",
        "healthScore",
        "procedure",
      ];
      expect(recipe.dataValues).to.contains.keys(keys);
    });
  });

  describe("Properties can not be null ", () => {
    it("Property name can not be null", async () => {
      try {
        await Recipe.create({
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
        });
      } catch (error) {
        expect(error.message).to.exist;
      }
    });

    it("Property image can not be null", async () => {
      try {
        await Recipe.create({
          name: "Fried Anchovies with Sage",
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
        });
      } catch (error) {
        expect(error.message).to.exist;
      }
    });

    it("Property summary can not be null", async () => {
      try {
        await Recipe.create({
          name: "Fried Anchovies with Sage",
          image: "https://spoonacular.com/recipeImages/1-556x370.jpg",
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
        });
      } catch (error) {
        expect(error.message).to.exist;
      }
    });

    it("Property healthScore can not be null", async () => {
      try {
        await Recipe.create({
          name: "Fried Anchovies with Sage",
          image: "https://spoonacular.com/recipeImages/1-556x370.jpg",
          summary:
            "You can never have too many Chinese recipes, so give Cauliflower, Brown Rice, and Vegetable Fried Rice a try. This recipe serves 8 and costs $1.12 per serving.",
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
        });
      } catch (error) {
        expect(error.message).to.exist;
      }
    });

    it("Property diets can not be null", async () => {
      try {
        await Recipe.create({
          name: "Fried Anchovies with Sage",
          image: "https://spoonacular.com/recipeImages/1-556x370.jpg",
          summary:
            "You can never have too many Chinese recipes, so give Cauliflower, Brown Rice, and Vegetable Fried Rice a try. This recipe serves 8 and costs $1.12 per serving.",
          healthScore: 75,
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
        });
      } catch (error) {
        expect(error.message).to.exist;
      }
    });

    it("Property procedure can not be null", async () => {
      try {
        await Recipe.create({
          name: "Fried Anchovies with Sage",
          image: "https://spoonacular.com/recipeImages/1-556x370.jpg",
          summary:
            "You can never have too many Chinese recipes, so give Cauliflower, Brown Rice, and Vegetable Fried Rice a try. This recipe serves 8 and costs $1.12 per serving.",
          healthScore: 75,
          diets: [1, 2, 3],
        });
      } catch (error) {
        expect(error.message).to.exist;
      }
    });

  });
});
