var careatorApp = angular.module('careatorApp', ['ui.router', 'ui.bootstrap', 'ngAnimate']);

careatorApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('careatorApp.userCreate', {
            url: careator_userCreate(),
            templateUrl: '/html/careatorApp/careatorHTML/createUsers.html',
            controller: 'createUsersCtrl',
            resolve: {
                result: function (sessionAuthFactory, $window) {
                    var userData = sessionAuthFactory.getAccess("userData");
                    if (userData.loginType == 'admin') {

                    }
                    else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }
        })
        .state('careatorApp.chatHistory', {
            url: careator_chatHistory(),
            templateUrl: '/html/careatorApp/careatorHTML/chatHistory.html',
            controller: 'chatHistoryCtrl',
            resolve: {
                result: function (sessionAuthFactory, $window) {
                    var userData = sessionAuthFactory.getAccess("userData");
                    if (userData.loginType == 'admin') {

                    }
                    else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }
        })
})

function careator_userCreate() {
    return '/userCreate';
}
function careator_chatHistory() {
    return '/chatHistory';
}

