careatorApp.controller('editUserCtrl', function ($scope, $state, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("editUserCtrl==>");
    console.log("id: " + $state.params.id);
    var id = $state.params.id;
    $scope.getUser = function () {
        console.log("getUser-->");
        var api = "https://norecruits.com/careator_getEmp/careator_getUserById/" + id;
        console.log("api: " + api);
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            if (checkStatus) {
                $scope.userData = data.data.data;
                console.log("userData: " + JSON.stringify($scope.userData));
                console.log(data.data.message);
            } else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
        console.log("<--getAllEmployee");
    }
    $scope.getUser();
})