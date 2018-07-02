var careatorApp = angular.module('careatorCommApp', ['ui.router', 'angularjs-dropdown-multiselect']);

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
        .state('Cdashboard.createGroup', {
            url: createGroup(),
            templateUrl: '/careatorApp/html/createGroup.html'

        })
        .state('Cdashboard.usersListCtrl', {
            url: usersListCtrl(),
            templateUrl: '/careatorApp/html/userList.html'

        })
        .state('Cdashboard.groupListCtrl', {
            url: groupListCtrl(),
            templateUrl: '/careatorApp/html/groupList.html'

        })
        .state('Cdashboard.editUser', {
            url: editUser(),
            templateUrl: '/careatorApp/html/userEdit.html'

        }).state('Cdashboard.editGroup', {
            url: editGroup(),
            templateUrl: '/careatorApp/html/groupEdit.html'

        })
        .state('Cdashboard.chatHistory', {
            url: careator_chatHistory(),
            templateUrl: '/careatorApp/html/chatHistory.html'

        })
})

function editUser() {
    return '/editUser';
}
function editGroup() {
    return '/editGroup';
}

function groupListCtrl() {
    return '/groupList';
}

function usersListCtrl() {
    return '/usersList';
}

function careator_userCreate() {
    return '/userCreate';
}

function createGroup() {
    return '/createGroup';
}

function careator_chatHistory() {
    return '/chatHistory';
}