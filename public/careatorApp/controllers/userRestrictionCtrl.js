careatorApp.controller('userRestrictionCtrl', function ($scope, $state, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("userRestrictionCtrl==>");
    console.log("id: " + $state.params.id);
    var id = $state.params.id;
    $scope.selectedMembers = []; /* ### $scope.selectedMembers contains groupmembers  ### */
   

    $scope.memberSettings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        externalIdProp: ''
    };
    $scope.memberData = [];
    $scope.memberModel = [];

    $scope.rightEmployeeList = function () {

        console.log("rightEmployeeList-->");

        var api = "https://norecruits.com/careator/getChatRights_emp";
        console.log("api: " + JSON.stringify(api));
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                var members = data.data.data;
                console.log("members: " + JSON.stringify(members));
                $scope.memberData = [];
                for (var x = 0; x < members.length; x++) {
                    console.log(" before $scope.memberData: " + JSON.stringify($scope.memberData));
                    console.log("members[x].email: " + members[x].email + " members[x]._id: " + members[x]._id);
                    $scope.memberData.push({
                        "email": members[x].email,
                        "label": members[x].name + " - " + members[x].empId,
                        "id": members[x]._id
                    });
                    for (var y = 0; y < $scope.members.length; y++) {
                        console.log("y iteration-->");
                        if ($scope.selectedMembers[y].id == $scope.memberData[x].id) {
                            $scope.memberModel.push($scope.memberData[x]);
                        }
                    }
                }
                $scope.groupAdminData = $scope.memberModel;
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


    $scope.updateGroup = function () {
        console.log("updateGroup-->");
        var api = "https://norecruits.com/careator_groupDelete/groupDeleteById/" + id;
        console.log("api: " + api);
        var obj = {
            "groupName": $scope.grpname,
        }
        console.log("groupName: " + $scope.grpname);
       
        var groupMembers = [];
        for (var x = 0; x < $scope.groupMemberModel.length; x++) {
            groupMembers.push({
                "email": $scope.groupMemberModel[x].email,
                "name": $scope.groupMemberModel[x].name,
                "userId": $scope.groupMemberModel[x].userId
            })
        }
        console.log("groupMembers: " + JSON.stringify(groupMembers));
        var groupAdmin = [];
        for (var x = 0; x < $scope.groupAdminModel.length; x++) {
            groupMembers.push({
                "email": $scope.groupAdminModel[x].email,
                "name": $scope.groupAdminModel[x].name,
                "userId": $scope.groupAdminModel[x].userId
            })
        }

        console.log("groupAdmin: " + JSON.stringify(groupAdmin));
        console.log("groupMembers: " + JSON.stringify(groupMembers));
        // careatorHttpFactory.post(api, obj).then(function (data) {
        //     console.log("data--" + JSON.stringify(data.data));
        //     var checkStatus = careatorHttpFactory.dataValidation(data);
        //     console.log("data--" + JSON.stringify(data.data));
        //     if (checkStatus) {
        //         console.log(data.data.message);
        //         $state.go("Cdashboard.groupListCtrl")
        //     }
        //     else {
        //         console.log("Sorry: " + data.data.message);
        //     }
        // })
    }




})