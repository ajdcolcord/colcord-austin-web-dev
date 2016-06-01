(function() {
    angular
        .module("Prepper")
        .controller("RecipeEditController", RecipeEditController);

    function RecipeEditController($location, $routeParams, RecipeService) {
        var vm = this;

        vm.updateRecipe = updateRecipe;
        vm.deleteRecipe = deleteRecipe;
        vm.addIngredientRow = addIngredientRow;
        vm.removeIngredient = removeIngredient;
        
        vm.uid = $routeParams["uid"];
        vm.rid = $routeParams["rid"];
        
        function init() {
            vm.recipe = angular.copy(RecipeService.findRecipeById(vm.rid));
        }
        init();

        function updateRecipe() {
            RecipeService.updateRecipe(vm.rid, vm.recipe);
            $location.url("/user/"+ vm.uid + "/recipe/" + vm.rid);
        }

        function deleteRecipe() {
            RecipeService.deleteRecipe(vm.rid);
            $location.url("/user/"+ vm.uid + "/recipe/recipe-book");
        }
        
        function addIngredientRow() {
            vm.recipe.ingredients.push({_id: (new Date).getTime()});
        }

        function removeIngredient(ingredientId) {
            for(var i in vm.recipe.ingredients) {
                if(vm.recipe.ingredients[i]._id == ingredientId) {
                    vm.recipe.ingredients.splice(i, 1);
                }
            }
        }
    }
    
})();