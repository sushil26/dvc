careatorApp.controller('createGroupCtrl', function ($scope, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("createGroupCtrl==>");

    $scope.names = ['Chat', 'Video'];


    $scope.example14model = [];
    $scope.example14settings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true
    };
    $scope.example14data = [{
        "label": "Alabama",
        "id": "AL"
    }, {
        "label": "Alaska",
        "id": "AK"
    }]

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
                $scope.allemployee = data.data.data;
                console.log("allemployee: " + JSON.stringify($scope.allemployee));
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