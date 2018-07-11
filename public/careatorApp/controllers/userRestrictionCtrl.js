careatorApp.controller('userRestrictionCtrl', function ($scope, $state, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("editGroupCtrl==>");
    console.log("id: " + $state.params.id);
    var id = $state.params.id;
    $scope.selectedMembers = []; /* ### $scope.selectedMembers contains groupmembers  ### */
    var allUsers = [];

    $scope.allUserSettings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        externalIdProp: '',
        selectionLimit: 1,
    };
    $scope.userSelectEvent = {
        onItemSelect: function (item) {
            console.log('selected: ' + item);
            console.log('selected json: ' + JSON.stringify(item));
            var id = item.id;
            var api = "https://norecruits.com//careator_getUser/careator_getUserById/" + id;
            console.log("api: " + JSON.stringify(api));
            careatorHttpFactory.get(api).then(function (data) {
                console.log("data--" + JSON.stringify(data.data));
                var checkStatus = careatorHttpFactory.dataValidation(data);
                console.log("data--" + JSON.stringify(data.data));
                if (checkStatus) {
                    allUsersData = data.data.data[0];
                    console.log("allUsersData: " + JSON.stringify(allUsersData));
                    $scope.restrictedTo = [];
                    console.log("allUsersData.restrictedTo: " + JSON.stringify(allUsersData.restrictedTo));
                    console.log("allUsersData.restrictedTo.length: " + allUsersData.restrictedTo.length);
                    
                    for (var x = 0; x < allUsersData.restrictedTo.length; x++) {
                        $scope.restrictedTo.push(allUsersData.restrictedTo[x].userId);
                    }
                    console.log("$scope.restrictedTo: " + JSON.stringify($scope.restrictedTo));
                    $scope.authorizedFor();
                }
            })
        },
        onItemDeselect: function (item) {
            console.log('unselected: ' + item);
            console.log('unselected json: ' + JSON.stringify(item));
        }
    }
    $scope.allUserData = [];
    $scope.allUserModel = [];

    $scope.rightEmployeeList = function () {
        console.log("rightEmployeeList-->");
        var api = "https://norecruits.com/careator/getChatRights_emp";
        console.log("api: " + JSON.stringify(api));
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                allUsers = data.data.data;

                console.log("allUsers: " + JSON.stringify(allUsers));
                $scope.allUserData = [];
                for (var x = 0; x < allUsers.length; x++) {
                    console.log(" before $scope.allUserData: " + JSON.stringify($scope.allUserData));
                    console.log("allUsers[x].email: " + allUsers[x].email + " allUsers[x]._id: " + allUsers[x]._id);
                    $scope.allUserData.push({
                        "email": allUsers[x].email,
                        "label": allUsers[x].name + " - " + allUsers[x].empId,
                        "id": allUsers[x]._id
                    });
                    for (var y = 0; y < $scope.selectedMembers.length; y++) {
                        console.log("y iteration-->");
                        if ($scope.selectedMembers[y].id == $scope.allUserData[x].id) {
                            $scope.allUserModel.push($scope.allUserData[x]);
                        }
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

    $scope.authorizedUserModel = [];
    $scope.authorizedUserSettings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        externalIdProp: ''
    };
    $scope.restrictedUserSelectEvent = {
        onItemSelect: function (item) {
            console.log('selected: ' + item);
            console.log('selected json: ' + JSON.stringify(item));
            var id = item.id;
            var restrictedTo = [{
            "userId": $scope.allUserModel[0].id
            }]
            console.log("restrictedTo: " + JSON.stringify($scope.restrictedTo));
            var api = "https://norecruits.com/careator_restrictedTo/restrictedTo/" + id;
            console.log("api: " + api);
            var obj = {
                "restrictedTo": restrictedTo
            }
            careatorHttpFactory.post(api, obj).then(function (data) {
                console.log("data--" + JSON.stringify(data.data));
                var checkStatus = careatorHttpFactory.dataValidation(data);
                console.log("data--" + JSON.stringify(data.data));
                if (checkStatus) {
                    console.log(data.data.message);
                    $state.go("Cdashboard.groupListCtrl")
                }
                else {
                    console.log("Sorry: " + data.data.message);
                }
            })
        },
        onItemDeselect: function (item) {
            console.log('unselected: ' + item);
            console.log('unselected json: ' + JSON.stringify(item));
        }
    }
    $scope.authorizedFor = function () {
        console.log("authorizedFor-->");
        $scope.authorizedUserData = [];
        $scope.authorizedUserModel = [];
        console.log("$scope.restrictedTo: " + JSON.stringify($scope.restrictedTo));
        for (var x = 0; x < allUsers.length; x++) {
            console.log("start to gather data");
            if ($scope.allUserModel[0].id != allUsers[x]._id) {
                $scope.authorizedUserData.push({
                    "email": allUsers[x].email,
                    "label": allUsers[x].name + " - " + allUsers[x].empId,
                    "id": allUsers[x]._id,
                });
                if ($scope.restrictedTo.indexOf(allUsers[x]._id) >= 0) {
                    $scope.authorizedUserModel.push($scope.authorizedUserData[x]);
                }

            }
        }
        console.log("authorizedUserData: " + JSON.stringify($scope.authorizedUserData));
    }

    $scope.restrictUpdate = function () {
        console.log("restrictUpdate-->");
        console.log("allUserModel: " + JSON.stringify($scope.allUserModel));
        var id = $scope.allUserModel[0].id;
        console.log("allUserModel[0].id: " + $scope.allUserModel[0].id);
        console.log("authorizedUserModel: " + JSON.stringify($scope.authorizedUserModel));
        var restrictedTo = [];
        for (var x = 0; x < $scope.authorizedUserModel.length; x++) {
            restrictedTo.push({
                "userId": $scope.authorizedUserModel[x].id
            });
        }
        console.log("restrictedTo: " + JSON.stringify($scope.restrictedTo));
        var api = "https://norecruits.com/careator_restrictedTo/restrictedTo/" + id;
        console.log("api: " + api);
        var obj = {
            "restrictedTo": restrictedTo
        }
        careatorHttpFactory.post(api, obj).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                console.log(data.data.message);
                $state.go("Cdashboard.groupListCtrl")
            }
            else {
                console.log("Sorry: " + data.data.message);
            }
        })
    }


})