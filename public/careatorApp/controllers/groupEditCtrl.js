careatorApp.controller('editGroupCtrl', function ($scope, $state, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("editGroupCtrl==>");
    console.log("id: " + $state.params.id);
    var id = $state.params.id;

    $scope.getGroup = function () {
        console.log("getGroup-->");
        var api = "https://norecruits.com/careator_getGroup/careator_getGroupById/" + id;
        console.log("api: " + api);
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            if (checkStatus) {
                $scope.userData = data.data.data[0];
                console.log("userData: " + JSON.stringify($scope.userData));
                console.log(data.data.message);
                for (var x = 0; x < $scope.userData.groupMembers.length; x++) {

                    $scope.groupMemberModel.push({
                        "email":  $scope.userData.groupMembers[x].email,
                        "label":  $scope.userData.groupMembers[x].name + " - " +  $scope.userData.groupMembers[x].empId,
                        "id":  $scope.userData.groupMembers[x]._id
                    })
                }

            } else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
        console.log("<--getAllEmployee");
    }
    $scope.getGroup();

    $scope.groupMemberSettings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        externalIdProp: ''
    };
    $scope.groupMemberData = [];
    $scope.groupMemberModel = [];

    $scope.rightEmployeeList = function (value) {

        console.log("rightEmployeeList-->");
        console.log("value: " + value);
           var api = "https://norecruits.com/careator/getChatRights_emp";
        console.log("api: " + JSON.stringify(api));
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                var groupMembers = data.data.data;
                console.log("groupMembers: " + JSON.stringify(groupMembers));
                $scope.groupMemberData = [];
                for (var x = 0; x < groupMembers.length; x++) {
                    console.log(" before $scope.groupMemberData: " + JSON.stringify($scope.groupMemberData));
                    console.log("groupMembers[x].email: " + groupMembers[x].email + " groupMembers[x]._id: " + groupMembers[x]._id);
                    $scope.groupMemberData.push({
                        "email": groupMembers[x].email,
                        "label": groupMembers[x].name + " - " + groupMembers[x].empId,
                        "id": groupMembers[x]._id
                    });
                    console.log(" after $scope.groupMemberData: " + JSON.stringify($scope.groupMemberData));
                }

                console.log(data.data.message);
            }
            else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
        $scope.groupMemberModel = [];


        console.log("<--rightEmployeeList");
    }

    $scope.rightEmployeeList();

})