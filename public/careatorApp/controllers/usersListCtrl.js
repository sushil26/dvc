careatorApp.controller('usersListCtrl', function ($scope,$state,careatorHttpFactory) {
    console.log("usersListCtrl==>");
    $scope.getAllEmployee = function () {
        console.log("getAllEmployee-->");
        var api = "https://norecruits.com/careator/careator_getAllEmp";
        console.log("api: " + api);
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.allemployee = data.data.data;
                console.log("allemployee: " + JSON.stringify($scope.allemployee));
                console.log(data.data.message);
            }
            else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
        console.log("<--getAllEmployee");
    }

    $scope.getAllEmployee();

    $scope.statusChange = function(id, status){
        console.log("statusChange-->");
        console.log("id: "+id+" status: "+status);
        var obj = {
            "id": id,
            "status": status
        }
        var api = "https://norecruits.com/careator/statusChangeById";
        console.log("api: " + api);
        careatorHttpFactory.post(api, obj).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.allemployee = data.data.data;
                console.log("allemployee: " + JSON.stringify($scope.allemployee));
                console.log(data.data.message);
            }
            else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
        console.log("<--statusChange");
    }

    $scope.editUser = function(index){
        console.log("editUser-->");
        console.log("$scope.allemployee[index]: "+JSON.stringify($scope.allemployee[index]));
        var data = $scope.allemployee[index];
        var obj = {
            "id":data._id, "userName":data.userName, "videoRights":data.videoRights, "chatRights":data.chatRights, "email":data.email
        }
        console.log("obj: "+JSON.stringify(obj));
     //   $state.go("Cdashboard.editUser",{});
    }
})