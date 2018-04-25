app.controller('attendanceCtl', function ($scope, $window, httpFactory, sessionAuthFactory ) {
    console.log("attendanceCtl==>");
    $scope.file = {}; /* ### Note: Upload file declaration ### */
    
    $scope.getAllClass = function(req,res){
        console.log("getAllClass-->");
        $scope.classList = [];
        var api = "https://norecruits.com/vc/getAllClass";
        console.log("api: " + api);
        httpFactory.get(api).then(function (data) {
          var checkStatus = httpFactory.dataValidation(data);
          //console.log("data--" + JSON.stringify(data.data));
          if (checkStatus) {
            var dateList = data.data.data;
            console.log("studentList: " + JSON.stringify($scope.dateList));
            // for (var x = 0; x < $scope.studentList.length; x++) {
            //   $scope.studList.push({ "id": $scope.studentList[x]._id, "name": $scope.studentList[x].studName, "studId": $scope.studentList[x].studId });
    
            // }
          //  console.log(" $scope.studList.length: " + $scope.studList.length);
            //   $scope.css = $scope.teacherData[0].css;
            //   console.log("$scope.css: " + JSON.stringify($scope.css));
          }
          else {
            console.log("sorry");
          }
        })
        console.log("<--getAllClass");
    }
    
    
    $scope.getStudListForCS = function (css) {

        console.log("getStudListForCS-->");
        // console.log("$scope.cssSelect: "+JSON.stringify($scope.cssSelect));
        console.log("css" + css);
        console.log("JSON.css" + JSON.stringify(css));
        var clas = css.class;
        var section = css.section;
        $scope.studList = [];
        // var cssRef = [{"clas":css.class, "section": css.section}];
        // console.log("cssRef: "+JSON.stringify(cssRef));
    
        var api = "https://norecruits.com/vc/getStudListForCS" + "/" + clas + "/" + section;
        //var api = "http://localhost:5000/vc/getStudListForCS" + "/" + clas + "/" + section;
        //var api = "https://norecruits.com/vc/getStudListForCS";
    
        console.log("api: " + api);
        httpFactory.get(api).then(function (data) {
          var checkStatus = httpFactory.dataValidation(data);
          //console.log("data--" + JSON.stringify(data.data));
          if (checkStatus) {
            $scope.studentList = data.data.data;
            console.log("studentList: " + JSON.stringify($scope.studentList));
            for (var x = 0; x < $scope.studentList.length; x++) {
              $scope.studList.push({ "id": $scope.studentList[x]._id, "name": $scope.studentList[x].studName, "studId": $scope.studentList[x].studId });
    
            }
            console.log(" $scope.studList.length: " + $scope.studList.length);
            //   $scope.css = $scope.teacherData[0].css;
            //   console.log("$scope.css: " + JSON.stringify($scope.css));
          }
          else {
            console.log("sorry");
          }
        })
        console.log("<--getStudListForCS");
    
      }
    
      $scope.festDetailSub = function (formName, file) {

        console.log("festDetailSub-->");
        if (formName.$valid) {
           
            console.log("file: " + file);
            console.log("$scope.file: " + $scope.file);
            // festDetailSubJson = {
            //     "title": title,
            //     "message": message
            // }
            if (file != undefined) {
                var uploadURL = "https://norecruits.com/vc/uploadAttendance";
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
                        // $scope.festivalDetailDetails();

                    } else {
                        $scope.status = data.data.status;
                        // $scope.message = data.data.message;
                        console.log("image is filed to uploaded");
                    }
                });
            }
            else {
                // $scope.festivalDetailDetails();
                console.log("image is not uploaded");
            }
        }
        console.log("<--festDetailSub");
    }
})