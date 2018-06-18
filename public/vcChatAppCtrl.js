app.controller("vcChatAppCtrl", function ($scope, $http, $timeout) {
    console.log("Chat controller==>");

    //    httpFactory.getFile('property.json');
    //    console.log("$rootScope.propertyJson: "+JSON.stringify($rootScope.propertyJson));
   
    $("#loginClick").trigger("click");

    function logCareatorAdmin() 
    document.querySelector('#start-recording').onclick = function () { 
        var id = document.getElementById('crdEmail').value;
        console.log("id: " + id);
        var pswd = document.getElementById('crdPswd').value;
        if (id == 'vc4allAdmin@gmail.com') {
            if (pswd == 'vc4all') {
                $('#crdntl').modal('hide');
            }
            else {
                document.getElementById("info_email").innerHTML = "Password is Not Valid"
                setTimeout(function () {
                    $('#info_email').fadeOut('fast');
                    $('#info_email').fadeIn('fast');
                    document.getElementById("info_email").innerHTML = '';
                    document.getElementById("info_email").style.display = 'inline';
                }, 3000);

            }
        }
        else {
            document.getElementById("info_email").innerHTML = "Email is Not Valid"
            setTimeout(function () {
                $('#info_email').fadeOut('fast');
                $('#info_email').fadeIn('fast');
                document.getElementById("info_email").innerHTML = '';
                document.getElementById("info_email").style.display = 'inline';
            }, 3000);

        }
    }
  
    // $scope.logCareatorAdmin = function ( email, Password) {
    //     $scope.notification = false;
    //     console.log("logCareatorAdmin");
    //     // loginModal.close('resetModel');
      
    //     if (email == 'vc4allAdmin@gmail.com') {
          
    //         if (Password == 'vc4all') {

    //         }
    //         else {
                
    //             // $scope.doGreeting = function () {
    //                 $scope.msg = 'Password is not valied'
    //                 $scope.notification = true;
                  
    //             // };
               
    //         }

    //     }
    //     else {
    //         // $scope.notification = false;
    //         // $scope.doGreeting = function () {
    //             $scope.msg = 'Email is not valied';
    //             $scope.notification = true;
               
    //         // };
           
    //     }

    // }
    // if(careatorAdmin){

    // }
    // else{

    // }

    // var email = localStorage.getItem('careatorEmail');

    // $scope.getChatHistoryById = function () {
    //     var api = "https://norecruits.com/chatHistory/getHistoryByEmailId/" + email;
    //     console.log("api: " + api);
    //     $http({
    //         method: 'GET',
    //         url: api
    //     }).then(function successCallback(response) {
    //         console.log("response: " + JSON.stringify(response));
    //         $scope.chatHistory = response.data.data;
    //         console.log("$scope.chatHistory[0].chat: " + JSON.stringify($scope.chatHistory[0].chat));
    //         // $scope.chats = $scope.chatHistory[0].chat;
    //         console.log("$scope.chatHistory: " + $scope.chatHistory[0].chat.length);
    //     }, function errorCallback(response) {
    //         console.log("response: " + JSON.stringify(response));
    //         // called asynchronously if an error occurs
    //         // or server returns response with an error status.
    //     });
    // }

    // // $scope.getChatHistoryById();

    // $scope.chatShow = function (index) {
    //     console.log("chatShow-->");
    //     console.log("$scope.chatHistory[index]: " + JSON.stringify($scope.chatHistory[index]));
    //     $scope.chats = $scope.chatHistory[index].chat;

    // }

})