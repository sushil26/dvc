app.controller('dashboardPersonalDetailController', function ($scope, $window, httpFactory) {
    console.log("dashboardController==>");


    $scope.userData = sessionAuthFactory.getAccess("userData");
    $scope.loginType = $scope.userData.loginType;
    $scope.userName = $scope.userData.userName;

var id=$scope.userData.id;

    $scope.getTeacherDetails = function (id) {
        console.log("getTeacherData-->");
       

        var api = "https://norecruits.com/vc/teacherDetail" + "/" + id;
        //var api = "http://localhost:5000/vc/teacherDetail" + "/" + id;
        //var api = "http://localhost:5000/vc/eventGet";
        console.log("api: " + api);
        httpFactory.get(api).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            //console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.userData = data.data.data;
                console.log("teacherData: " + JSON.stringify($scope.userData));
                //   $scope.css = $scope.teacherData[0].css;
                //   console.log("$scope.css: " + JSON.stringify($scope.css));
            }
            else {

            }

        })
        console.log("<--getTeacherData");
    }

    $scope.getStudentDetails = function (id) {
        console.log("getTeacherData-->");
      
        var api = "https://norecruits.com/vc/studentDetail" + "/" + id;
        console.log("api: " + api);
        $scope.teacherList = [];
        httpFactory.get(api).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            //console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.userData = data.data.data;
                console.log("studentData: " + JSON.stringify($scope.userData));
            }
            else {

            }
        })
    }

    if ($scope.loginType == 'teacher') {
        $scope.getTeacherDetails(id);
        console.log("teacher login");

    }
    else if ($scope.loginType == 'studParent') {
        $scope.getStudentDetails(id);
        console.log("studParent login");
    }
    else if ($scope.loginType == 'admin') {
        console.log("admin Login");
    }





})