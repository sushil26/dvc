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
                $scope.selectedMembers = [];
                for (var x = 0; x < $scope.userData.groupMembers.length; x++) {
                    $scope.selectedMembers.push({
                        "email": $scope.userData.groupMembers[x].email,
                        "label": $scope.userData.groupMembers[x].name,
                        "id": $scope.userData.groupMembers[x]._id
                    })
                }
                console.log("$scope.selectedMembers.-->: "+JSON.stringify($scope.selectedMembers));
                $scope.rightEmployeeList();

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

    $scope.rightEmployeeList = function () {

        console.log("rightEmployeeList-->");

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
                    for (var y = 0; y < $scope.selectedMembers.length; y++) {
                        console.log("y iteration-->");
                        console.log("$scope.selectedMembers[y].id: "+JSON.stringify($scope.selectedMembers[y].id));
                        console.log("$scope.groupMemberData[x].id: "+JSON.stringify($scope.groupMemberData[x].id));
                        if ($scope.selectedMembers[y].id == $scope.groupMemberData[x].id) {
                            console.log(" $scope.groupMemberData[x]: " + JSON.stringify($scope.groupMemberData[x]));
                            $scope.groupMemberModel.push($scope.groupMemberData[x]);
                            console.log(" $scope.groupMemberModel: " + JSON.stringify($scope.groupMemberModel));
                        }
                    }

                    console.log(" after $scope.groupMemberData: " + JSON.stringify($scope.groupMemberData));
                }

                console.log(data.data.message);
            }
            else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
        console.log("<--rightEmployeeList");
    }



})