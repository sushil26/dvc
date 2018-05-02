app.controller('adminCreateCtl', function ($scope, $window, httpFactory, sessionAuthFactory) {
    console.log("adminCreateCtl==>");
    
    $scope.adminCreate = function () {
        console.log("adminCreate-->");
        var objJson = {
            "schoolName":"DPS",
            "schoolRegNumber":"12345",
            "firstName":"raja",
            "lastName":"rani",
            "address":"BTM, 2nd Stage",
            "city":"Bangalore",
            "streetName": "BTM",
            "pinCode":"23954",
            "country":"India",
            "dob":"14/06/1992",
            "email":"dpsAdmin@gmail.com",
            "mobNumber":"9878767876",
            "pswd":"admin"
        }
        console.log("objJson: "+JSON.stringify(objJson));
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