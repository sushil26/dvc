app.controller("vcChatAppCtrl", function ($scope, $rootScope, httpFactory) {
    console.log("Chat controller==>");

    httpFactory.getFile('property.json');
    
    var email = localStorage.getItem('careatorEmail');

    $scope.getChatHistoryById = function () {
        var api = "chatHistory/getHistoryByEmailId/" + email;
        console.log("api: " + api);
        httpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = httpFactory.dataValidation(data);
            if (checkStatus) {
                $scope.chatHistory = data.data;
                // $scope.adminList = data.data.data;
                // console.log("adminList: " + JSON.stringify($scope.adminList));
                // console.log(data.data.message);
            }
            else {
                console.log("Sorry");
            }
        })
    }

    $scope.getChatHistoryById();

})