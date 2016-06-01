(function() {
    angular
        .module("Prepper")
        .controller("RecipeViewController", RecipeViewController);

    function RecipeViewController($routeParams, RecipeService, PrepService) {
        var vm = this;
        
        vm.addToPrepToDo = addToPrepToDo;
        
        vm.uid = $routeParams["uid"];
        vm.rid = $routeParams["rid"];
        vm.multiplier = 1;
        
        function init() {
            vm.recipe = RecipeService.findRecipeById(vm.rid);
            vm.restaurantId = vm.recipe.restaurantId;
            vm.prepList = PrepService.findPrepListByRestaurantId(vm.restaurantId);
        }
        init();
        
        function addToPrepToDo() {
            var newPrepItem = {
                recipeId: vm.recipe._id,
                important: false,
                signer: "",
                timeStamp: (new Date).toDateString()};
            PrepService.addToPrepListToDo(vm.prepList._id, newPrepItem);
        }
    }
    
})();