careatorApp.controller('createUsersCtrl', function ($scope, $rootScope, $state, careatorHttpFactory) {
    console.log("createUsersCtrl==>");
    $scope.propertyJson = $rootScope.propertyJson;
    $scope.uploadCareatorEmp = function (careatorEmp) {
        console.log("uploadCareatorEmp-->");

        var obj = {
            "file": careatorEmp
        }
        var api = "https://norecruits.com/careator/careatorMasterInsert";
        console.log("api: " + api);
        careatorHttpFactory.csvUpload(obj, api).then(function (data) {
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                console.log("checkStatus: " + checkStatus);
                alert(data.data.message);
                $state.go("Cdashboard.usersListCtrl");
            }
            else {
                console.log("checkStatus: " + checkStatus);
                alert(data.data.message);
            }
        })
        console.log("<--uploadCareatorEmp");
    }
    $scope.careatorEmp = function (name, empId, emailId, rights) {
        console.log("careatorEmp-->");
        console.log("name: "+name);
        var obj = {
            "userName": name,
            "empId": empId,
            "empEmail": emailId,
            "rightSelect": rights
        }
        console.log("obj: "+JSON.stringify(obj));
    }
});