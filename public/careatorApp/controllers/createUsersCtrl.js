careatorApp.controller('createUsersCtrl', function ($scope, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("createUsersCtrl==>");
    $scope.propertyJson = $rootScope.propertyJson;
    $scope.uploadCareatorEmp = function(careatorEmp){
        console.log("uploadCareatorEmp-->");
        
        var obj = {
            "file": careatorEmp
          }
          var api = "https://norecruits.com/careator/careatorMasterInsert";
          console.log("api: "+api);
          careatorHttpFactory.csvUpload(obj, api).then(function (data) {
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                console.log("checkStatus: " + checkStatus);
                alert(data.data.message);
            }
            else {
                console.log("checkStatus: " + checkStatus);
                alert(data.data.message);
            }
        })
        console.log("<--uploadCareatorEmp");
    }
})