careatorApp.controller('editGroupCtrl', function ($scope, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("editGroupCtrl==>");
    console.log("id: " + $state.params.id);
    var id = $state.params.id;

    $scope.getGroup = function () {
        console.log("getGroup-->");

        var api = "https://norecruits.com//careator_getGroup/careator_getGroupById/" + id;
        console.log("api: " + api);
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            if (checkStatus) {
                $scope.userData = data.data.data;
                $scope.userDataRights = {
                    "videoRights": $scope.userData.videoRights,
                    "chatRights": $scope.userData.chatRights
                }
                console.log("userData: " + JSON.stringify($scope.userData));
                console.log(data.data.message);
            }
            else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })


        console.log("<--getAllEmployee");
    }
    $scope.getGroup();



})