careatorApp.controller('careator_dashboardCtrl', function ($scope, $rootScope, $filter, careatorSessionAuth, careatorHttpFactory) {
    console.log("careator_dashboardCtrl==>");
    $scope.getChatGroupListById = function (id) {
        console.log("getAllEmployee-->");
        var api = "https://norecruits.com/careator/getChatGroupListById/"+id;
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
    var userData = {
        "email": localStorage.getItem("email"),
        "userName": localStorage.getItem("userName"),
        "empId": localStorage.getItem("empId"),
        "userId": localStorage.getItem("userId")
    }
    if (localStorage.getItem("videoRights") == 'yes') {
        userData.videoRights = "yes";
    }
    if (localStorage.getItem("chatRights") == 'yes') {
        userData.chatRights = "yes";
        $scope.getChatGroupListById(localStorage.getItem("userId"));
    }
 
    careatorSessionAuth.setAccess(userData);

})