careatorApp.controller('usersListCtrl', function ($scope, $rootScope, $filter, $window, careatorHttpFactory) {
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
        console.log("usersListCtrl-->");
        console.log("id: "+id+" status: "+status);
        var obj = {
            "status": status
        }
        var api = "https://norecruits.com/careator/careator_statusChangeById/"+id;
        console.log("api: " + api);
        careatorHttpFactory.put(api, obj).then(function (data) {
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
        console.log("<--usersListCtrl");
    }
})