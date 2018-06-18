app.controller("vcChatAppCtrl", function ($scope, $http, $timeout) {
    console.log("Chat controller==>");

    //    httpFactory.getFile('property.json');
    //    console.log("$rootScope.propertyJson: "+JSON.stringify($rootScope.propertyJson));
    $scope.notification = false;
    $("#loginClick").trigger("click");
  
    $scope.logCareatorAdmin = function (loginType, email, Password) {
        console.log("logCareatorAdmin");
        // loginModal.close('resetModel');
      
        if (email == 'vc4allAdmin@gmail.com') {
          
            if (Password == 'vc4all') {

            }
            else {
                
                // $scope.doGreeting = function () {
                    $scope.msg = 'Password is not valied'
                    $scope.notification = true;
                    $timeout(function () {
                        $scope.notification = false;
                    }, 10000);
                // };
               
            }

        }
        else {
            // $scope.notification = false;
            // $scope.doGreeting = function () {
                $scope.msg = 'Email is not valied';
                $scope.notification = true;
                $timeout(function () {
                    $scope.notification = false;
                }, 10000);
            // };
           
        }

    }
    // if(careatorAdmin){

    // }
    // else{

    // }

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
            console.log("$scope.chatHistory[0].chat: " + JSON.stringify($scope.chatHistory[0].chat));
            // $scope.chats = $scope.chatHistory[0].chat;
            console.log("$scope.chatHistory: " + $scope.chatHistory[0].chat.length);
        }, function errorCallback(response) {
            console.log("response: " + JSON.stringify(response));
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    // $scope.getChatHistoryById();

    $scope.chatShow = function (index) {
        console.log("chatShow-->");
        console.log("$scope.chatHistory[index]: " + JSON.stringify($scope.chatHistory[index]));
        $scope.chats = $scope.chatHistory[index].chat;

    }

})