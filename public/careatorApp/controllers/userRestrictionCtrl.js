careatorApp.controller('userRestrictionCtrl', function ($scope, $state, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("editGroupCtrl==>");
    console.log("id: " + $state.params.id);
    var id = $state.params.id;
    $scope.selectedMembers = []; /* ### $scope.selectedMembers contains groupmembers  ### */
    var allUsers;

    $scope.allUserSettings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        externalIdProp: '',
        selectionLimit: 1,
    };
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
                $scope.authorizedFor();
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

    $scope.authorizedFor = function () {
        console.log("authorizedFor-->");
        $scope.authorizedUserData = [];
        $scope.authorizedUserModel = [];
        console.log(" $scope.allUserData.length: "+ $scope.allUserData.length);
        console.log(" $scope.allUserData: "+ JSON.stringify($scope.allUserData));
        for (var x = 0; x < $scope.allUsers.length; x++) {
            console.log("start to gather data");
            if($scope.allUserModel[0].id!=$scope.allUsers[x].id){
                $scope.authorizedUserData.push({
                    "email": $scope.allUsers[x].email,
                    "label": $scope.allUsers[x].lable,
                    "id": $scope.allUsers[x].id
                });
            }
           
        }
        console.log("authorizedUserData: "+JSON.stringify( $scope.authorizedUserData));
    }

    $scope.$watch('$scope.allUserModel', function(){
        console.log("$scope.allUserModel changes happene");
    })


    $scope.authorizedUserSettings = {
        externalIdProp: '',
        enableSearch: true,
    };







})