careatorApp.controller('profileCtrl', function ($scope, $state, careatorHttpFactory, careatorSessionAuth) {
    console.log("profileCtrl++++++>>>>>>");

    var userData = careatorSessionAuth.getAccess("userData");
var id = userData.id;
    $scope.getChatGroupListById = function (id) {
        console.log("getAllEmployee-->: " + id);
        var api = "https://norecruits.com/careator_chatGroupList/careator_getChatGroupListById/" + id;
        console.log("api: " + api);
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            if (checkStatus) {
                $scope.allGroup = data.data.data;
                console.log("allGroup: " + JSON.stringify($scope.allGroup));
                console.log(data.data.message);

            } else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
        console.log("<--getAllEmployee");
    }

    $scope.getChatGroupListById(id);


})