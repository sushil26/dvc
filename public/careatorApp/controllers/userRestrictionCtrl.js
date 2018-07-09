careatorApp.controller('editGroupCtrl', function ($scope, $state, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("editGroupCtrl==>");
    console.log("id: " + $state.params.id);
    var id = $state.params.id;
    $scope.selectedMembers = []; /* ### $scope.selectedMembers contains groupmembers  ### */
 

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
                        if ($scope.selectedMembers[y].id == $scope.groupMemberData[x].id) {
                            $scope.groupMemberModel.push($scope.groupMemberData[x]);
                        }
                    }
                }
                $scope.groupAdminData = $scope.groupMemberModel;
                for (var x = 0; x < $scope.groupAdminData.length; x++) {
                    console.log("$scope.groupAdminData[x]: " + JSON.stringify($scope.groupAdminData[x]));
                    console.log("$scope.selectedAdmin: " + JSON.stringify($scope.selectedAdmin));
                    if ($scope.groupAdminData[x].id == $scope.selectedAdmin.userId) {
                        $scope.groupAdminModel.push($scope.groupAdminData[x]);
                    }
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
    $scope.rightEmployeeList();

    $scope.groupAdminSettings = {
        selectionLimit: 1,
        externalIdProp: '',
        enableSearch: true,
    };

    $scope.groupAdminModel = [];






})