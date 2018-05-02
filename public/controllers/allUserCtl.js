app.controller('allUserCtl', function ($scope, $window, httpFactory, sessionAuthFactory) {
    console.log("allUserCtl==>");
    $scope.userData = sessionAuthFactory.getAccess("userData");
    console.log(" $scope.userData : " + JSON.stringify($scope.userData));

    $scope.getSchoolList = function () {
        console.log("getSchoolList-->");
        var api = "https://norecruits.com/vc/getSchoolList";
        console.log("api: " + api);
        httpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.schoolList = data.data.data;
                console.log("schoolList: " + JSON.stringify($scope.schoolList));

                console.log(data.data.message);
            }
            else {
                console.log("Sorry");
            }

        })

        console.log("<--getSchoolList");
    }
    $scope.getSchoolList();

    $school.schoolUserData = function(schoolName){
        console.log("schoolUserData-->");
        var api = "https://norecruits.com/vc/getSchoolUser/"+schoolName;
        console.log("api: " + api);
        httpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.schoolUser = data.data.data;
                console.log("schoolList: " + JSON.stringify($scope.schoolUser));

                console.log(data.data.message);
            }
            else {
                console.log("Sorry");
            }

        })
        console.log("<--schoolUserData");
    }
})