careatorApp.controller('createGroupCtrl', function ($scope, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("createGroupCtrl==>");

    $scope.names = ['Chat', 'Video'];


    $scope.memberListModel = [];
    $scope.memberListSettings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true
    };
    $scope.memberListData = [];

    $scope.rightEmployeeList = function (value) {
        console.log("rightEmployeeList-->");
        console.log("value: " + value);
        var api;
        if(value == "chat"){
           api = "https://norecruits.com/careator/getChatRights_emp";
        }
        else if(value == "video"){
            api = "https://norecruits.com/careator/getVideoRights_emp";
        }
        else{
            api = "https://norecruits.com/careator/careator_getChatVideo_emp";
        }
        console.log("api: "+JSON.stringify(api));
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                var groupMembers = data.data.data;
                console.log("groupMembers: " + JSON.stringify(groupMembers));
                for(var x=0;x< groupMembers.length;x++){
                    memberListData.push({"id":groupMembers._id, "email": groupMembers.email})
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