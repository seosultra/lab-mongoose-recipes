const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    return Recipe.create({
      title: "Hrira",
      level: "Amateur Chef",
      ingredients: [
        "peas",
        "tomato",
        "vermicelle",
        "flour",
        "lentiles",
        "corriandre",
        "celery",
      ],
      cuisine: "Morrocan",
      dishType: "soup",
      duration: 60,
      creator: "Sumia",
    });
  })
  .then((recipe) => {
    console.log(recipe);

    return Recipe.insertMany(data);
  })

  .then((recipes) => {
    // console.log("recipe titles:");
    recipes.forEach((recipe) => {
      console.log(recipe.title);
    });
    // console.log(recipes);

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    console.log(updatedRecipe);

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deletedRecipe) => {
    console.log("Deleted: ", deletedRecipe);

    return mongoose.disconnect();
  })
  .then(() => {
    console.log("Disconnected");
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
