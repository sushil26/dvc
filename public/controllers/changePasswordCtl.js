app.controller('changePasswordCtl', function ($scope, $filter, $window, httpFactory, sessionAuthFactory,$uibModal) {
    console.log("passwordChangeCtl==>");
    $scope.userData = sessionAuthFactory.getAccess();
    var schoolName = $scope.userData.schoolName;

    $scope.currentPswdCheck = function(){
        console.log("currentPswdCheck-->");

        console.log("<--currentPswdCheck");
    }
    $scope.passwordChange = function () {
        console.log("passwordChange-->");
        var objJson = {
           
        }
        console.log("objJson: " + JSON.stringify(objJson));
        //var api = "https://norecruits.com/vc/adminCreate";
        console.log("api: "+api);
        httpFactory.post(api, objJson).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                var loginAlert = $uibModal.open({
                    scope: $scope,
                    templateUrl: '/html/templates/dashboardsuccess.html',
                    windowClass: 'show',
                    backdropClass: 'static',
                    keyboard: false,
                    controller: function ($scope, $uibModalInstance) {
                      $scope.message = data.data.message;
                    }
                  })
                // alert(data.data.message);
            }
            else{
                var loginAlert = $uibModal.open({
                    scope: $scope,
                    templateUrl: '/html/templates/dashboardwarning.html',
                    windowClass: 'show',
                    backdropClass: 'static',
                    keyboard: false,
                    controller: function ($scope, $uibModalInstance) {
                      $scope.message = "Failed to create";
                    }
                  })
             //   alert("Failed to create");
            }
        })
        console.log("<--passwordChange");
    }
})