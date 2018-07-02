careatorApp.controller('createUsersCtrl', function ($scope, $rootScope, $filter, $window) {
    console.log("createUsersCtrl==>");
    $scope.propertyJson = $rootScope.propertyJson;
    $scope.uploadCareatorEmp = function(careatorEmp){
        console.log("uploadCareatorEmp-->");
        var obj = {
            "file": careatorEmp
          }
          var api = $scope.propertyJson.careator_careatorMasterInsert;
          console.log("api: "+api);
          httpFactory.csvUpload(obj, api).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                console.log("checkStatus: " + checkStatus);
            }
            else {
                console.log("checkStatus: " + checkStatus);
            }
        })
        console.log("<--uploadCareatorEmp");
    }
})