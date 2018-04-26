app.controller('attendanceCtl', function ($scope, $window, httpFactory, sessionAuthFactory) {
  console.log("attendanceCtl==>");
  $scope.file = {}; /* ### Note: Upload file declaration ### */
  $scope.uploadTypes = ["Attendance", "Payment", "Mark Report"];
  $scope.testTypes = ["AT", "UT", "MT", "TT", "AT"];

  $scope.sma = []; /* ### Note:sma-Subject Mark Attendant  */
   $scope.addSMA = function () {
    console.log("addSMA-->");

    $scope.sma.push({ subject: "", mark: "", attendance: "" });

    console.log("<--addSMA");
  };
  $scope.uploadReports = []; /* ### Note:uploadReports  */
  $scope.addUploadReports = function () {
    console.log("addUploadReports-->");

    $scope.uploadReports.push({ uploadType: "", csSelect: "", ttSelect: "", uploadedFile:"" });

    console.log("<--addUploadReports");
  }
  $scope.attendanceMark = function (file) {
    console.log("attendanceMark-->");
    console.log("file: " + file);
    console.log("file: " + $scope.file);
    var api = "https://norecruits.com/vc/uploadMark";


    httpFactory.imageUpload(file, api).then(function (data) {
      var checkStatus = httpFactory.dataValidation(data);
      console.log("data--" + JSON.stringify(data.data));
      if (checkStatus) {
        alert(data.data.message);
      }
      else {
        alert(data.data.message);
      }
    })

    // var cs = [{
    //   "class": $scope.csSelect.class,
    //   "section": $scope.csSelect.section
    // }]
    // $scope.asm = [];
    // for(var x=0;x<$scope.asm.length;x++){
    //   $scope.asm.push({
    //     "attendance": $scope.asm[x].attendance,
    //     "subject": $scope.asm[x].subject,
    //     "mark": 
    //   })
    // }

    // var obj = {
    //   "cs": cs,
    //   "studName": $scope.studSelect.name,
    //   "studId": $scope.studSelect.studId,
    //   "ttSelect": $scope.ttSelect,
    //   "sma": $scope.sma
    // }
    // console.log("obj: " + JSON.stringify(obj));
    console.log("<--attendanceMark");
  }

  $scope.getAllClass = function (req, res) {
    console.log("getAllClass-->");

    var api = "https://norecruits.com/vc/getAllClass";
    console.log("api: " + api);
    httpFactory.get(api).then(function (data) {
      var checkStatus = httpFactory.dataValidation(data);
      console.log("data--" + JSON.stringify(data.data));
      if (checkStatus) {
        $scope.csList = data.data.data;
        console.log("csList: " + JSON.stringify($scope.csList));
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

  $scope.getAllClass();
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

  $scope.festDetailSub = function (file) {

    console.log("festDetailSub-->");


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

    console.log("<--festDetailSub");
  }
})