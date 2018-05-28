app.controller('dashboardEditController', function ($scope, $rootScope, $window, httpFactory, sessionAuthFactory) {
    console.log("dashboardEditController==>");
    $scope.propertyJson = $rootScope.propertyJson;
    $scope.file = {};/* ### Note Upload file declaration ### */
    $scope.userData = sessionAuthFactory.getAccess();
    var schoolName = $scope.userData.schoolName;
    var id = $scope.userData.id;
    $scope.loginType = $scope.userData.loginType;
    $scope.propertyJson = $rootScope.propertyJson;
    // $scope.whosPic = ["student", "father", "mother"];

    $scope.schoolLogoStorage = function () {
        console.log("schoolLogoStorage-->");
        /* #####  Start Upload File ###### */
        console.log("$scope.file: " + $scope.file);
        console.log("$scope.file: " + $scope.file.upload);

        //    if ($scope.file.upload) {
        var uploadURL = $scope.propertyJson.VC_schoolLogo;
        console.log("uploadURL: " + uploadURL);
        console.log("$scope.file.upload from : alumRegCtr.js: " + $scope.file.upload);
        httpFactory.imageUpload(uploadURL, $scope.file).then(function (data) {
            console.log("hello " + JSON.stringify(data));
            var checkStatus = httpFactory.dataValidation(data);
            console.log("checkStatus: " + checkStatus);
            //console.log("data.data.success: " + data.data.success);
            if (checkStatus) {
                console.log("$scope.photo" + JSON.stringify(data));
                $scope.getUpdateofImage = data;
                console.log("$scope.getUpdateofImage" + JSON.stringify($scope.getUpdateofImage));
                //$scope.message = data.data.message;
                $scope.filePath = data.data.data.filePath;
                if (data.data.message == 'date stored successfully') {


                }
                alert(data.data.message);
            } else {
                $scope.status = data.data.status;
                $scope.message = data.data.message;
                alert(data.data.message);
                console.log("image is not uploaded");
            }
        });
        console.log("<--schoolLogoStorage");
    }

    $scope.profilePicUpdated = function () {
        console.log("profilePicUpdated-->");
        var obj;
        if ($scope.loginType == 'teacher') {
            obj = {
                "profilePic_path": pic_owner
            }
        }
        else if ($scope.loginType == 'studParent') {
            if ($scope.pic_owner == 'student') {
                obj = {
                    "stud_profilePic_path": pic_owner,
                }
            }
            else if($scope.pic_owner == 'mother'){
                obj = {
                    "mother_profilePic_path": pic_owner,
                }
            }
            else if($scope.pic_owner == 'father'){
                obj = {
                    "father_profilePic_path": pic_owner,
                }
            }

        }
        else if ($scope.loginType == 'admin') {
            obj = {
                "profilePic_path": pic_owner
            }
        }
        console.log("obj: " + obj);
        var api = $scope.propertyJson.VC_updateProfilePic + "/" + id;
        console.log("api: " + api);
        httpFactory.post(api, obj).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            //console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                console.log("data" + JSON.stringify(data.data))
                var loginAlert = $uibModal.open({
                    scope: $scope,
                    templateUrl: '/html/templates/dashboardsuccess.html',
                    windowClass: 'show',
                    backdropClass: 'static',
                    keyboard: false,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.message = "Successfully update";
                    }
                })


                $state.go('dashboard.personalDetail');
                //$scope.eventGet();
            }
            else {
                var loginAlert = $uibModal.open({
                    scope: $scope,
                    templateUrl: '/html/templates/dashboardwarning.html',
                    windowClass: 'show',
                    backdropClass: 'static',
                    keyboard: false,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.message = "Event Send Failed, try again ";
                    }
                })
                // alert("Event Send Failed");
            }
        })
        console.log("<--profilePicUpdated");
    }




})