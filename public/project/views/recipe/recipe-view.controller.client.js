(function() {
    angular
        .module("Prepper")
        .controller("RecipeViewController", RecipeViewController);

    function RecipeViewController($routeParams, RecipeService, PrepService, TimerService) {
        var vm = this;
        
        vm.addToPrepToDo = addToPrepToDo;
        vm.addTimer = addTimer;
        
        vm.uid = $routeParams["uid"];
        vm.rid = $routeParams["rid"];
        vm.multiplier = 1;
        vm.timerAdded = false;
        vm.addedToPrepToDo = false;
        
        function init() {
            RecipeService
                .findRecipeById(vm.rid)
                .then(
                    function(response) {
                        vm.recipe = response.data;
                        vm.restaurantId = vm.recipe.restaurantId;
                        return PrepService
                            .findPrepListByRestaurantId(vm.restaurantId);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                ).then(
                    function(response) {
                        vm.prepList = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
        init();
        
        function addToPrepToDo() {
            var newPrepItem = {
                _recipeId: vm.recipe._id,
                name: vm.recipe.name,
                important: false,
                notes: "",
                timeStamp: (new Date).toDateString()};
            PrepService
                .addToPrepListToDo(vm.prepList._id, newPrepItem)
                .then(
                    function(response) {
                        vm.success = "Successfully added recipe to to-do";
                        vm.addedToPrepToDo = true;
                    },
                    function(error) {
                        vm.error = error.data;
                        vm.addedToPrepToDo = false;
                    }
                )
        }
        
        function addTimer(minutes) {
            if(minutes) {
                var newTimer = {
                    name: vm.recipe.name,
                    _recipe: vm.recipe._id,
                    _user: vm.uid,
                    restaurantId: vm.recipe.restaurantId,
                    timeStart: new Date(Date.now()),
                    setMinutes: minutes,
                    timeEnd: new Date(Date.now() + (minutes * 60000))
                };
                TimerService
                    .createTimer(newTimer)
                    .then(
                        function(response) {
                            vm.success = "Successfully added timer";
                            vm.timerAdded = true;
                        },
                        function(error) {
                            vm.error = error.data;
                            vm.timerAdded = false;
                        }
                    )
            }
            else {
                vm.error = "Please enter a time for the timer";
            }
        }
    }
    
})();