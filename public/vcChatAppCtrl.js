app.controller("vcChatAppCtrl", function ($scope, $rootScope, httpFactory, $http) {
    console.log("Chat controller==>");

    //    httpFactory.getFile('property.json');
    //    console.log("$rootScope.propertyJson: "+JSON.stringify($rootScope.propertyJson));

    var email = localStorage.getItem('careatorEmail');

    $scope.getChatHistoryById = function () {
        var api = "https://norecruits.com/chatHistory/getHistoryByEmailId/" + email;
        console.log("api: " + api);
        $http({
            method: 'GET',
            url: api
        }).then(function successCallback(response) {
            console.log("response: " + JSON.stringify(response));
            $scope.chatHistory = response.data.data;
            $scope.chats = $scope.chatHistory[0].chat;
            console.log("$scope.chatHistory: " + $scope.chatHistory[0].chat.length);
        }, function errorCallback(response) {
            console.log("response: " + JSON.stringify(response));
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.getChatHistoryById();

    $scope.chatShow = function (index) {
        console.log("chatShow-->");
        console.log("$scope.chatHistory[index]: "+JSON.stringify($scope.chatHistory[index]));
        $scope.chats = $scope.chatHistory[index].chat;

    }

})