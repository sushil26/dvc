var careatorApp = angular.module('careatorCommApp', ['ui.router']);

careatorApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('dashboard', {
        url: careator_dashboard(),
        templateUrl: '/careatorApp/html/careator_dashboard.html',
        controller: 'careator_dashboardCtrl',
        // resolve: {
        //     result: function (sessionAuthFactory, $window) {
        //         var userData = sessionAuthFactory.getAccess("userData");
        //         if (userData.loginType == 'admin') {

        //         }
        //         else {
        //             $window.location.href = 'https://norecruits.com';
        //         }
        //     }
        // }
    })
        .state('careatorApp.userCreate', {
            url: careator_userCreate(),
            templateUrl: '/html/careatorApp/careatorHTML/createUsers.html',
            controller: 'createUsersCtrl',
            // resolve: {
            //     result: function (sessionAuthFactory, $window) {
            //         var userData = sessionAuthFactory.getAccess("userData");
            //         if (userData.loginType == 'admin') {

            //         }
            //         else {
            //             $window.location.href = 'https://norecruits.com';
            //         }
            //     }
            // }
        })
        .state('careatorApp.chatHistory', {
            url: careator_chatHistory(),
            templateUrl: '/careatorApp/html/chatHistory.html',
            controller: 'chatHistoryCtrl',
            // resolve: {
            //     result: function (sessionAuthFactory, $window) {
            //         var userData = sessionAuthFactory.getAccess("userData");
            //         if (userData.loginType == 'admin') {

            //         }
            //         else {
            //             $window.location.href = 'https://norecruits.com';
            //         }
            //     }
            // }
        })
})

function careator_dashboard(){
    return '/dashboard';
}

function careator_userCreate() {
    return '/userCreate';
}
function careator_chatHistory() {
    return '/chatHistory';
}

