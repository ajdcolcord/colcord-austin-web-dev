(function() {
    angular
        .module("Prepper")
        .controller("ProfileEditController", ProfileEditController);

    function ProfileEditController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.addRestaurantId = addRestaurantId;
        vm.submitted = false;

        vm.uid = $routeParams["uid"];
        vm.employees = [];

        function init() {
            UserService
                .findUserById(vm.uid)
                .then(
                    function(response) {
                        vm.user = response.data;
                        if (vm.user.manager) {
                            getEmployees();
                        }
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
        init();

        function getEmployees() {
            UserService
                .findUsersByRestaurantId(vm.user.restaurantId)
                .then(
                    function(response) {
                        var users = response.data;
                        for(var i in users) {
                            if (users[i]._id != vm.user._id) {
                                vm.employees.push(users[i]);
                            }
                        }
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function updateUser(current_pass, new_pass, verify_new_pass) {
            vm.submitted = true;
            if (vm.user.password === current_pass) {
                if (new_pass && verify_new_pass && new_pass == verify_new_pass) {
                    vm.user.password = new_pass;

                    UserService
                        .updateUser(vm.uid, vm.user)
                        .then(
                            function(res) {
                                vm.success = "User successfully updated";
                                $location.url("/user/" + vm.uid);
                                vm.submitted = false;
                            },
                            function(error) {
                                vm.error = error.data;
                            }
                        );
                }
                else {
                    vm.error = "New passwords must match and must not be empty";
                }
            }
            else {
                vm.error = "Incorrect Password";
            }
        }

        function addRestaurantId(newRestaurantId) {
            if(newRestaurantId) {
                UserService
                    .addRestaurantId(vm.uid, newRestaurantId)
                    .then(
                        function(res) {
                            vm.success = "User successfully updated";
                            $location.url("/user/" + vm.uid);
                            vm.submitted = false;
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    );
            }
            else {
                vm.error = "Please enter a Restaurant ID";
            }
        }
    }

})();