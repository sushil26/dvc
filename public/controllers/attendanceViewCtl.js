app.controller('attendanceViewCtl', function ($scope, $window, httpFactory, sessionAuthFactory) {
    console.log("attendanceViewCtl==>");

    $scope.userData = sessionAuthFactory.getAccess();
    var schoolName = $scope.userData.schoolName;

    $scope.getTeacherData = function () {
        console.log("getTeacherData-->");
        var id = $scope.userData.id;
        var api = "https://norecruits.com/vc/teacherDetail" + "/" + id;
        //var api = "http://localhost:5000/vc/teacherDetail" + "/" + id;
        //var api = "http://localhost:5000/vc/eventGet";
        console.log("api: " + api);
        httpFactory.get(api).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            // console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {

                $scope.teacherPersonalData = data.data.data;
                console.log("teacherPersonalData: " + JSON.stringify($scope.teacherPersonalData));

            }
            else {
            }
        })
        console.log("<--getTeacherData");
    }
    if (loginType == 'teacher') {
        $scope.userLoginType = 'teacher';
        $scope.getTeacherData();
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

        var api = "https://norecruits.com/vc/getStudListForCS" + "/" + schoolName + "/" + clas + "/" + section;
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
                    $scope.studList.push({ "id": $scope.studentList[x]._id, "name": $scope.studentList[x].firstName, "studId": $scope.studentList[x].schoolId });

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

    // $scope.userData = sessionAuthFactory.getAccess("userData");
    // $scope.loginType = $scope.userData.loginType;
    // $scope.userName = $scope.userData.userName;
})