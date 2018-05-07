app.controller('viewUserController',function ($scope, $state, $window, httpFactory) {
    console.log("viewUserController==>");
    var id = $state.params.id
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
                $scope.userDetail = data.data.data;
                console.log("userDetail: " + JSON.stringify($scope.userDetail));
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