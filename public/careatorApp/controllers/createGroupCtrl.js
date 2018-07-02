careatorApp.controller('createGroupCtrl', function ($scope, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("createGroupCtrl==>");

    $scope.names = ['Chat', 'Video'];


    $scope.example14model = [];
    $scope.example14settings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true
    };
    $scope.example14data = [];

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
                    $scope.example14data.push({"label": groupMembers.email, "id":groupMembers._id})
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