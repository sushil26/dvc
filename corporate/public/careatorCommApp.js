var careatorApp = angular.module('careatorCommApp', ['ui.router', 'angularjs-dropdown-multiselect', 'ngCookies', 'ngImgCrop', 'angularUtils.directives.dirPagination', 'angular-loading-bar', 'angularMoment', 'oitozero.ngSweetAlert', 'mwl.calendar', 'ui.bootstrap', 'ngFileUpload']);

careatorApp.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    // cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = true;
    // cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';
}])
careatorApp.config(function ($stateProvider) {
    $stateProvider
        .state('Cdashboard', {
            url: careator_dashboard(),
            templateUrl: '/careatorApp/html/careator_dashboard.html',
        })
        .state('Cdashboard.adminCreate', {
            url: careator_adminCreate(),
            templateUrl: '/careatorApp/html/createAdmin.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == 'vc4all@talenkart.com') {

                    } else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }

        })
        .state('Cdashboard.adminList', {
            url: adminList(),
            templateUrl: '/careatorApp/html/adminList.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == 'vc4all@talenkart.com') {

                    } else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }

        })
        .state('Cdashboard.userCreate', {
            url: careator_userCreate(),
            templateUrl: '/careatorApp/html/createUsers.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == 'vc4all@talenkart.com') {

                    } else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }

        })
        .state('Cdashboard.createGroup', {
            url: createGroup(),
            templateUrl: '/careatorApp/html/createGroup.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == 'vc4all@talenkart.com') {

                    } else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }

        })
        .state('Cdashboard.usersListCtrl', {
            url: usersListCtrl(),
            templateUrl: '/careatorApp/html/userList.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == 'vc4all@talenkart.com') {

                    } else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }

        })
        .state('Cdashboard.groupListCtrl', {
            url: groupListCtrl(),
            templateUrl: '/careatorApp/html/groupList.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == 'vc4all@talenkart.com') {

                    } else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }

        })
        .state('Cdashboard.orgSetting', {
            url: orgSetting(),
            templateUrl: '/careatorApp/html/organizationSetting.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == 'vc4all@talenkart.com') {

                    } else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }

        })
        .state('Cdashboard.editUser', {
            url: editUser(),
            templateUrl: '/careatorApp/html/userEdit.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == 'vc4all@talenkart.com') {

                    } else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }

        })
        .state('Cdashboard.editGroup', {
            url: editGroup(),
            templateUrl: '/careatorApp/html/groupEdit.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == 'vc4all@talenkart.com') {

                    } else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }

        })
        .state('Cdashboard.chatHistory', {
            url: careator_chatHistory(),
            templateUrl: '/careatorApp/html/chatHistory.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == 'vc4all@talenkart.com') {

                    } else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }

        })
        .state('Cdashboard.chat', {
            url: careator_chat(),
            templateUrl: '/careatorApp/html/chat.html',
            // resolve: {
            //     result: function (careatorSessionAuth, $window) {
            //         var userData = careatorSessionAuth.getAccess("userData");
            //         if (userData.email == null || userData.email == "") {
            //             $window.location.href = 'https://norecruits.com';
            //         } else {

            //         }
            //     }
            // }
        })
        .state('Cdashboard.profile', {
            url: profile(),
            templateUrl: '/careatorApp/html/profile.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    // var userData = careatorSessionAuth.getAccess("userData");
                    // if (userData.email == null || userData.email == "") {
                    //     $window.location.href = 'https://norecruits.com';
                    // } else {
                       
                    // }
                }
            }
        })

        .state('Cdashboard.ipost', {
            url: ipost(),
            templateUrl: '/careatorApp/html/ipost.html',
        })

        .state('Cdashboard.userRestrict', {
            url: careator_userRestrict(),
            templateUrl: '/careatorApp/html/userRestriction.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == 'vc4all@talenkart.com') {

                    } else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }

        })

        .state('Cdashboard.vc4allSchedule', {
            url: careator_vc4allSchedule(),
            templateUrl: '/careatorApp/html/vcSchedule.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == null || userData.email == "") {
                        $window.location.href = 'https://norecruits.com';
                    } else {
                       
                    }
                }
            }
        })
        .state('Cdashboard.upcomingEvent', {
            url: careator_upcomingEvent(),
            templateUrl: '/careatorApp/html/careator_upcomingEvent.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == null || userData.email == "") {
                        $window.location.href = 'https://norecruits.com';
                    } else {
                       
                    }
                }
            }
            
        })
        .state('Cdashboard.historyEvent', {
            url: careator_historyEvent(),
            templateUrl: '/careatorApp/html/careator_historyEvent.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == null || userData.email == "") {
                        $window.location.href = 'https://norecruits.com';
                    } else {
                       
                    }
                }
            }
        })
        .state('Cdashboard.loginDetails', {
            url: careator_loginDetails(),
            templateUrl: '/careatorApp/html/userLoginDetails.html',
            resolve: {
                result: function (careatorSessionAuth, $window) {
                    var userData = careatorSessionAuth.getAccess("userData");
                    if (userData.email == 'vc4all@talenkart.com') {

                    } else {
                        $window.location.href = 'https://norecruits.com';
                    }
                }
            }
        })

})
function orgSetting(){
    return 'orgSetting';
}

function ipost() {
    return '/ipost';
}

function profile() {
    return '/profile';
}
function careator_adminCreate() {
    return '/adminCreate';
}
function adminList() {
    return '/adminList';
}

function contactAdmin() {
    return '/contactAdmin';
}

function careator_dashboard() {
    return '/dashboard';
}

function editUser() {
    return '/editUser/:id';
}

function editGroup() {
    return '/editGroup/:id';
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
    return '/chatHistory/:id';
}

function careator_chat() {
    return '/chat';
}

function careator_userRestrict() {
    return '/userRestrict'
}

function careator_vc4allSchedule() {
    return '/vc4allSchedule';
}

function careator_upcomingEvent() {
    return '/upcomingEvent'
}

function careator_historyEvent() {
    return '/historyEvent'
}

function careator_loginDetails(){
    return '/loginDetails'
}