
var app = angular.module('vcApp', ['ui.router', 'mwl.calendar', 'ui.bootstrap', 'ngCookies']);

 app.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/calendar")

    $stateProvider
      .state('calendar', {
        url: '/calendar',
        templateUrl: '/html/calendar.html',
        controller: 'calendarCtrl'

      })
      .state('userAuth', {
        url: '/userAuth',
        templateUrl: '/html/userAuthentication.html',
        controller: 'userAuthCtrl'
      })
      .state('teacherInsert', {
        url: '/teacherI',
        templateUrl: '/html/teacherDataInsert.html',
        controller: 'teacherInsertCtrl'
      })
      .state('studentInsert', {
        url: '/studentI',
        templateUrl: '/html/studentDataInsert.html',
        controller: 'studentInsertCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/html/dashboard.html',
        controller: 'dashboardController'
      })
      .state('dashboard.personalDetail', {
        url: dashboardPersonalDetail(),
        templateUrl: '/html/dashboardPersonalDetail.html',
        controller: 'dashboardPersonalDetailController'
      })
      .state('dashboard.editDetails', {
        url: dashboardEdit(),
        templateUrl: '/html/dashboardEdit.html',
        controller: 'dashboardEditController'
      })
      .state('dashboard.event', {
        url: dashboardEvent(),
        templateUrl: '/html/dashboardEvent.html',
        controller: 'dashboardEventController'
      })
  });

function dashboardEdit() {
  return '/editDetails';
}
function dashboardEvent() {
  return '/event';
}

function dashboardPersonalDetail() {
  return '/personalDetail';
}