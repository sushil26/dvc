careatorApp.controller('userLoginDetailsCtrl', function ($scope, $state, careatorHttpFactory, SweetAlert, careatorSessionAuth) {
    console.log("userLoginDetailsCtrl==>");
    $scope.userData = careatorSessionAuth.getAccess("userData");
    console.log(" $scope.userData : " + JSON.stringify($scope.userData));
    var orgId = $scope.userData.orgId;

    $scope.getAllEmployeeLoginDetails = function () {
        console.log("getAllEmployeeLoginDetails-->");
        var api = "https://norecruits.com/careator/careator_getAllEmpLoginDetails/" + orgId;
        console.log("api: " + api);
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.allemployeeLoginDetails = data.data.data;
                $scope.logDetails = [];
                for(var x=0;x<$scope.allemployeeLoginDetails.length;x++){
                    $scope.logDetails[$scope.allemployeeLoginDetails._id] = $scope.allemployeeLoginDetails[x];
                }
                console.log("allemployeeLoginDetails: " + JSON.stringify($scope.allemployeeLoginDetails));
                console.log(data.data.message);
            } else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
        console.log("<--getAllEmployee");
    }

    $scope.getAllEmployeeLoginDetails();



    /////////serch///////////////////
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    /* ### Start: receive message from careator.js  ### */
    socket.on("comm_userLoginNotify", function (data) {
        console.log("****comm_userLoginNotify-->: " + JSON.stringify(data));
        if (orgId == data.orgId) {
            $scope.allemployeeLoginDetails.push(data);
        }
        
        else {

        }
    });
    /* ### End: receive message from careator.js  ### */

})