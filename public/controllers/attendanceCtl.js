app.controller('attendanceCtl', function ($scope, $window, httpFactory, sessionAuthFactory ) {
    console.log("attendanceCtl==>");
    $scope.file = {}; /* ### Note: Upload file declaration ### */
    $scope.festDetailSub = function (formName, title, message, file) {

        console.log("festDetailSub-->");
        if (formName.$valid) {
            console.log("title: " + title);
            console.log("message: " + message);
            console.log("file: " + file);
            console.log("$scope.file: " + $scope.file);
            festDetailSubJson = {
                "title": title,
                "message": message
            }
            if (file != undefined) {
                var uploadURL = "http://localhost:8085/travel/uploadFestDetailPic";
                console.log("$scope.file from : alumRegCtr.js: " + $scope.file);
                httpFactory.imageUpload(file, uploadURL).then(function (data) {
                    var checkStatus = httpFactory.dataValidation(data);
                    if (checkStatus) {
                        $scope.getUpdateofImage = data;
                        console.log("$scope.getUpdateofImage" + JSON.stringify($scope.getUpdateofImage));
                        // $scope.message = data.data.message;
                        $scope.filePath = data.data.fileFullPath;
                        $scope.status = data.data.status;
                        if ($scope.filePath) {
                            festDetailSubJson.file = $scope.filePath;
                        }
                        $scope.festivalDetailDetails();

                    } else {
                        $scope.status = data.data.status;
                        // $scope.message = data.data.message;
                        console.log("image is filed to uploaded");
                    }
                });
            }
            else {
                $scope.festivalDetailDetails();
                console.log("image is not uploaded");
            }
        }
        console.log("<--festDetailSub");
    }
})