var careatorApp = angular.module('careatorCommApp', ['ui.router']);

careatorApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('Cdashboard', {
        url: careator_dashboard(),
        templateUrl: '/careatorApp/html/careator_dashboard.html'
       
    })
        .state('Cdashboard.userCreate', {
            url: careator_userCreate(),
            templateUrl: '/careatorApp/html/createUsers.html'

        })
        .state('careatorApp.chatHistory', {
            url: careator_chatHistory(),
            templateUrl: '/careatorApp/html/chatHistory.html'
            
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

