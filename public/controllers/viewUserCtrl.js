app.controller('viewUserController', function ($scope, $state, $window, httpFactory) {
    console.log("viewUserController==>");
    var id = $state.params.id;
    var loginT = $state.params.loginType;
    $scope.getTeacherDetails = function (id) {
        console.log("getTeacherData-->");
        if (loginT == 'teacher') {
            var api = "https://norecruits.com/vc/teacherDetail" + "/" + id;
        }
        else if(loginT == 'school')
        {
            var api = "https://norecruits.com/vc/getSchoolDataById" + "/" + id;
            $scope.loginType = "school";
        }
        else {
            var api = "https://norecruits.com/vc/studentDetail" + "/" + id;
        }
        //var api = "http://localhost:5000/vc/teacherDetail" + "/" + id;
        //var api = "http://localhost:5000/vc/eventGet";
        console.log("api: " + api);
        httpFactory.get(api).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            //console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.userDetail = data.data.data;
                console.log("userDetail: " + JSON.stringify($scope.userDetail));
                if($scope.userDetail.schoolRegNumber!=''){
                   
                }
                else
                {
                    $scope.loginType = $scope.userDetail[0].loginType;
                }
                
               
                //   $scope.css = $scope.teacherData[0].css;
                //   console.log("$scope.css: " + JSON.stringify($scope.css));
            }
            else {

            }

        })
        console.log("<--getTeacherData");
    }
    $scope.getTeacherDetails(id);

})