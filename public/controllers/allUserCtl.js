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

    $scope.schoolUserData = function (schoolName) {
        console.log("schoolUserData-->");
        var api = "https://norecruits.com/vc/getSchoolUser/" + schoolName;
        console.log("api: " + api);
        httpFactory.get(api).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                var schoolUser = data.data.data;
                console.log("schoolList: " + JSON.stringify(schoolUser));
                $scope.teacherData = schoolUser.schoolTeacherList[0];
                $scope.studentData = schoolUser.schoolStudentList[0];
                console.log(" $scope.teacherData: " + JSON.stringify( $scope.teacherData));
                console.log("$scope.studentData: " + JSON.stringify($scope.studentData));
                console.log(data.data.message);
            }
            else {
                console.log("Sorry");
            }

        })
        console.log("<--schoolUserData");
    }
})