app.controller('dashboardEditController', function ($scope, $rootScope, $window, httpFactory) {
    console.log("dashboardEditController==>");
    $scope.propertyJson = $rootScope.propertyJson;
    $scope.file = {};/* ### Note Upload file declaration ### */
    $scope.userData = sessionAuthFactory.getAccess();
    var schoolName = $scope.userData.schoolName;
    var id = $scope.userData.id;
    var loginType = $scope.userData.loginType;
    $scope.propertyJson = $rootScope.propertyJson;
    
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
            console.log("data.data.success: " + data.data.success);
            if (checkStatus) {
                console.log("$scope.photo" + JSON.stringify(data));
                $scope.getUpdateofImage = data;
                console.log("$scope.getUpdateofImage" + JSON.stringify($scope.getUpdateofImage));
                $scope.message = data.data.message;
                $scope.filePath = data.data.fileFullPath;
                $scope.status = data.data.success;
                // // console.log("JSON.stringify($scope.postJson): " + JSON.stringify(postJson));
                // $scope.adminCreate();
            } else {
                $scope.status = data.data.status;
                $scope.message = data.data.message;
                console.log("image is not uploaded");
                // $scope.adminCreate();
                // console.log("JSON.stringify($scope.postJson): " + JSON.stringify(postJson));
                // $scope.savePost();
            }
        });
        //}
        /* #####  End Upload File ###### */
        // else{
        //     alert("logo is required");
        // }
        console.log("<--schoolLogoStorage");
    }




})