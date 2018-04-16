app.controller('dashboardPersonalDetailController', function ($scope, $window, httpFactory) {
    console.log("dashboardController==>");

    var id = localStorage.getItem("id");

    $scope.getDetails = function (id) {
        console.log("getDetails-->");
        var api = "https://norecruits.com/vc/getLoginData" + "/" + id;

        httpFactory.get(api).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.userData = data.data.data;
                console.log(" $scope.userData: " + $scope.userData);
            }
            else {
                console.log("sorry");
            }
            console.log("<--getDetails");
        })
    }

    $scope.getDetails(id);


})