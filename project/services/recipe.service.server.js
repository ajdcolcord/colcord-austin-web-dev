module.exports = function(app) {
    var recipes = [
        {_id: "123",
            name: "Chicken Puff Pastry",
            prepTime: 10,
            type: "sandwich",
            description: "A warm chicken puff with cheddar cheese with avocado on ciabatta bread",
            ingredients: [
                {_id: "412", name: "Rotisserie Chicken", amount: 1.5, measure: "Cups"},
                {_id: "222", name: "Cheddar Cheese", amount: 1.5, measure: "Cups"},
                {_id: "441", name: "Avocado", amount: 1, measure: "Cup"},
                {_id: "980", name: "Frozen Puff Pastry", amount: 2, measure: "Sheets (17.25oz package), Thawed"},
                {_id: "612", name: "Large Egg", amount: 1, measure: "Cup, Beaten"},
                {_id: "411", name: "Dijon Mustard", amount: 0.25, measure: "Cup"}
            ],
            directions: "Cook chicken breast fully. PUFF - Steam cooked chicken breast for 2 minutes. Cut chicken breast in half. Place Cheddar Cheese, chicken breast, and avocado in Ciabatta. Panini press for 2 minutes",
            restaurantId: "12345",
            recent: true
        },
        {_id: "543",
            name: "Beef Broccoli Soup",
            prepTime: 20,
            type: "soup",
            description: "A warm beef soup with cheese",
            ingredients: [
                {_id: "993", name: "Beef (ground)", amount: 1.5, measure: "Pounds"},
                {_id: "561", name: "Broccoli", amount: 1.5, measure: "Cups"},
                {_id: "555", name: "Water", amount: 3, measure: "Cups"},
                {_id: "231", name: "Salt", amount: 2, measure: "tbsp"},
                {_id: "563", name: "Beef Broth", amount: 2, measure: "Tbsp"}
            ],
            directions: "Cook beef for a while, add into soup form, cook broccoli and beef in frying pan, mix with soup stuff.",
            restaurantId: "12345",
            recent: true
        },
        {_id: "998",
            name: "Beef Chili",
            prepTime: 30,
            type: "soup",
            description: "Our award winning chili",
            ingredients: [
                {_id: "323", name: "Beef (ground)", amount: 4, measure: "Pounds"},
                {_id: "909", name: "Beans", amount: 4, measure: "Cups"},
                {_id: "331", name: "Water", amount: 3, measure: "Cups"},
                {_id: "889", name: "Onion", amount: 2, measure: "Cups, Diced"},
                {_id: "665", name: "Pepper", amount: 1, measure: "Cups, Diced"}
            ],
            directions: "Cook it all together",
            restaurantId: "12345",
            recent: false
        },
        {_id: "909",
            name: "Chicken Breast",
            prepTime: 25,
            type: "meat",
            description: "Baked chicken breast",
            ingredients: [
                {_id: "339", name: "Chicken Breast", amount: 1, measure: "Breast"},
                {_id: "901", name: "Salt", amount: 1, measure: "tsp"}
            ],
            directions: "Cook chicken breast fully at 350 degrees Farenheit, let sit for 15 minutes. Salt lightly.",
            restaurantId: "12345",
            recent: true
        }
    ];
    
    app.post("/api/recipe", createRecipe);
    app.get("/api/restaurant/:restaurantId/recipe", findAllRecipesByRestaurantId);
    app.get("/api/recipe/:recipeId", findRecipeById);
    app.put("/api/recipe/:recipeId", updateRecipe);
    app.delete("/api/recipe/:recipeId", deleteRecipe);
    //
    function createRecipe(req, res) {
        var newRecipe = req.body;
        newRecipe._id = (new Date).getTime() + "";
        recipes.push(newRecipe);
        res.json(newRecipe);
    }
    
    function findAllRecipesByRestaurantId(req, res) {
        var restaurantId = req.params.restaurantId;
    
        var result = [];
        for(var i in recipes) {
            if(recipes[i].restaurantId === restaurantId) {
                result.push(recipes[i]);
            }
        }
        res.send(result);
    }
    
    function findRecipeById(req, res) {
        var recipeId = req.params.recipeId;
        for(var i in recipes) {
            if(recipes[i]._id === recipeId) {
                res.json(recipes[i]);
                return;
            }
        }
        res.status(400).send("Recipe with ID " + recipeId + " not found");
    }
    
    function updateRecipe(req, res) {
        var recipe = req.body;
        var recipeId = req.params.recipeId;
        
        for(var i in recipes) {
            if(recipes[i]._id == recipeId) {
                recipes[i].name = recipe.name;
                recipes[i].prepTime = recipe.prepTime;
                recipes[i].type = recipe.type;
                recipes[i].description = recipe.description;
                recipes[i].ingredients = recipe.ingredients;
                recipes[i].directions = recipe.directions;
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Recipe with ID " + recipeId + " not found");
    }
    
    function deleteRecipe(req, res) {
        var recipeId = req.params.websiteId;

        for(var i in recipes) {
            if (recipes[i]._id === recipeId) {
                recipes.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("Unable to remove recipe with ID " + recipeId);
    }
};