app.controller('allAdminCtl', function ($scope, $state, $window, httpFactory, sessionAuthFactory) {
    console.log("allAdminCtl==>");
    $scope.userData = sessionAuthFactory.getAccess("userData");
    console.log(" $scope.userData : " + JSON.stringify($scope.userData));

    $scope.getAllAdmin = function () {
        console.log("getAllAdmin-->");
        var api = "https://norecruits.com/vc/getAllAdmin";
        console.log("api: " + api);
        httpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.adminList = data.data.data;
                console.log("adminList: " + JSON.stringify($scope.adminList));

                console.log(data.data.message);
            }
            else {
                console.log("Sorry");
            }

        })

        console.log("<--getAllAdmin");
    }
    $scope.getAllAdmin();
    $scope.updateAdminStatus = function (id, status, index) {
        console.log("updateUserStatus-->");
        var api = "https://norecruits.com/vc/updateUserStatus";
        //var api = "http://localhost:5000/vc/updateUserStatus";

        var obj = {
            "id": id,
            "status": status
        }

        httpFactory.post(api, obj).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.teacherData[index].status = status;
                alert("Updated Status Successfully");
            }
            else {
                alert("Status updated failed, try again ");

            }

        })

        console.log("<--updateUserStatus");
    }

    $scope.viewUser = function(id){
        console.log("viewUser-->");
        $state.go('dashboard.viewUser', { 'id': id});
        console.log("<--viewUser");
    }
})