app.controller('allSchoolCtl', function ($scope, $window, httpFactory, sessionAuthFactory) {
    console.log("allSchoolCtl==>");
    $scope.userData = sessionAuthFactory.getAccess("userData");
    console.log(" $scope.userData : " + JSON.stringify($scope.userData));

    $scope.getAllSchool = function () {
        console.log("getAllSchool-->");
        var api = "https://norecruits.com/vc/getAllSchool";
        console.log("api: " + api);
        httpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.getAllSchool = data.data.data;
                console.log("getAllSchool: " + JSON.stringify($scope.getAllSchool));
                console.log(data.data.message);
            }
            else {
                console.log("Sorry");
            }
        })
        console.log("<--getAllSchool");
    }
    $scope.getAllAdmin();
    $scope.updateAdminStatus = function (id, status, index) {
        console.log("updateUserStatus-->");
        var api = "https://norecruits.com/vc/updateUserStatus";
        //var api = "http://localhost:5000/vc/updateUserStatus";

        var obj = {
            "id": id,
            "status": status
        }

        httpFactory.post(api, obj).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.teacherData[index].status = status;
                alert("Updated Status Successfully");
            }
            else {
                alert("Status updated failed, try again ");

            }

        })

        console.log("<--updateUserStatus");
    }
})