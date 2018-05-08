app.controller('adminCreateCtl', function ($scope, $window, httpFactory, sessionAuthFactory) {
    console.log("adminCreateCtl==>");

    $scope.adminCreate = function () {
        console.log("adminCreate-->");
        var objJson = {
            "schoolName": $scope.schoolName,
            "schoolRegNumber": $scope.schoolRegNumber,
            "firstName": $scope.firstName,
            "lastName": $scope.lastName,
            "dob": $filter('date')($scope.dob , "d MMM  y"),
            "email": $scope.email,
            "mobNumber": $scope.mobNumber,
            "address": $scope.address,
            "streetName": $scope.streetName,
            "city": $scope.city,
            "state": $scope.state,
            "pinCode": $scope.pinCode,
            "country": $scope.country,
            "pswd": $scope.pswd
        }
        console.log("objJson: " + JSON.stringify(objJson));
        var api = "https://norecruits.com/vc/adminCreate";
        httpFactory.post(api, objJson).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                alert(data.data.message);
            }
            else{
                alert("Failed to create");
            }
        })
        console.log("<--adminCreate");
    }

    // $scope.userData = sessionAuthFactory.getAccess("userData");
    // $scope.loginType = $scope.userData.loginType;
    // $scope.userName = $scope.userData.userName;
})