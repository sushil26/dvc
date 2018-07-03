careatorApp.controller('createGroupCtrl', function ($scope, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("createGroupCtrl==>");

    $scope.names = ['Chat', 'Video'];


    $scope.groupMemberModel = [];
    $scope.groupMemberSettings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        externalIdProp: ''
    };
    $scope.groupMemberData = [];



    $scope.rightEmployeeList = function (value) {
        console.log("rightEmployeeList-->");
        console.log("value: " + value);
        var api;
        if (value == "chat") {
            api = "https://norecruits.com/careator/getChatRights_emp";
        }
        else if (value == "video") {
            api = "https://norecruits.com/careator/getVideoRights_emp";
        }
        else {
            api = "https://norecruits.com/careator/careator_getChatVideo_emp";
        }
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
                        "label": groupMembers[x].email,
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

        console.log("<--rightEmployeeList");
    }
    $scope.$watchCollection('groupMemberModel', function () {
        console.log("value changed")
        $scope.groupAdminModel = [];
        $scope.groupAdminSettings = {
            scrollableHeight: '200px',
            scrollable: true,
            enableSearch: true,
            externalIdProp: ''
        };
        $scope.groupAdminData = $scope.groupMemberModel;
    });



})