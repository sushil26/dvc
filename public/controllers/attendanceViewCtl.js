app.controller('attendanceViewCtl', function ($scope, $window, httpFactory, sessionAuthFactory, moment, calendarConfig) {
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
                $scope.teacherData = data.data.data;
                $scope.teacherPersonalData = data.data.data;
                console.log("teacherPersonalData: " + JSON.stringify($scope.teacherPersonalData));
            }
            else {
            }
        })
        console.log("<--getTeacherData");
    }
    if ($scope.userData.loginType == 'teacher') {
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

        var api = "https://norecruits.com/vc/getStudListForCS" + "/" + schoolName + "/" + clas + "/" + section;
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
            }
            else {
                console.log("sorry");
            }
        })
        console.log("<--getStudListForCS");

    }

  var vm = this;
    
    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('day').toDate();
    var originalFormat = calendarConfig.dateFormats.hour;
    calendarConfig.dateFormats.hour = 'HH:mm';
    vm.events = [];
    $scope.getStudentAttendance = function (cs) {
        console.log("getStudentAttendance-->");
        console.log("cs: " + JSON.stringify(cs));
        var id = cs.id;
        var api = "https://norecruits.com/vc/getStudentAttendance" + "/" + id;
        console.log("api: " + api);
        httpFactory.get(api).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                var studData = data.data.data;
                $scope.attendance = studData[0].attendance;
                console.log("studData: " + JSON.stringify(studData));
                console.log("$scope.attendance: " + JSON.stringify($scope.attendance));
                console.log("$scope.attendance.length: " + $scope.attendance.length);
                for (var x = 0; x < $scope.attendance.length; x++) {
                    console.log("$scope.attendance[x]: " + JSON.stringify($scope.attendance[x]));
                    var year = "2018";
                    var mon = $scope.attendance[x].month;
                    console.log("$scope.attendance[x].dateAttendance.length: " + $scope.attendance[x].dateAttendance.length);
                    for (var y = 0; y < $scope.attendance[x].dateAttendance.length; y++) {
                        console.log("$scope.attendance[x].dateAttendance[y]: " + JSON.stringify($scope.attendance[x].dateAttendance[y]));
                        var day = $scope.attendance[x].dateAttendance[y].date;
                        console.log("day: " + day + "month: " + mon + "year: " + year);
                        var resultDate = new Date(year+" "+mon+" "+day);
                        console.log("resultDate: " + resultDate);
                        var obj = {
                            'startsAt': resultDate,
                            'draggable': true,
                            'resizable': true
                        }
                        console.log("obj: "+JSON.stringify(obj));
                        vm.events.push(obj);

                    }
                }
                console.log("vm.events: " + JSON.stringify(vm.events));

            }
            else {
                console.log("sorry");
            }
        })
        console.log("<--getStudentAttendance");
    }

})