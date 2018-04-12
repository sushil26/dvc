
var app = angular.module('vcApp', ['ui.router', 'mwl.calendar', 'ui.bootstrap', 'ngCookies']);
// app.config(['$locationProvider', function($locationProvider) {
//   $locationProvider.hashPrefix('');
// }]);


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
        url: '/personaldetails',
        templateUrl: '/html/dashboardPersonalDetail.html',
        controller: 'dashboardPersonalDetailController'
      })
      .state('dashboard.editDetails', {
        url: '/editDetails',
        templateUrl: '/html/dashboardEdit.html',
        controller: 'dashboardEditController'
      })
      .state('dashboard.event', {
        url: '/event',
        templateUrl: '/html/dashboardEvent.html'
      })
  });