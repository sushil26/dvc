
var app = angular.module('vcApp', ['ui.router', 'mwl.calendar', 'ui.bootstrap', 'ngCookies', 'ngImageInputWithPreview']);


 app.config(function($stateProvider, $urlRouterProvider) {

    // // For any unmatched url, send to /route1
    // $urlRouterProvider.otherwise("/calendar")

    $stateProvider
      .state('calendar', {
        url: '/calendar',
        templateUrl: '/html/calendar.html',
        controller: 'calendarCtrl'

      })
      .state('dashboard.userAuth', {
        url: dashboardUserAuth(),
        templateUrl: '/html/dashboard/userAuthentication.html',
        controller: 'userAuthCtrl',
        resolve: {result : function($window)
          {
              // var x =authFact.getLoginType();
              // if(localStorage.getItem("loginType") == 'admin')
              // {
                 
              // }
              //  else{
              //     $window.location.href='https://norecruits.com';
              //  }
             
             
          }}
      })
      .state('dashboard.teacherInsert', {
        url: dashboardTeacherI(),
        templateUrl: '/html/dashboard/teacherDataInsert.html',
        controller: 'teacherInsertCtrl',
        resolve: {result : function($window)
          {
              // var x =authFact.getLoginType();
              // if(localStorage.getItem("loginType") == 'admin')
              // {
                 
              // }
              //  else{
              //     $window.location.href='https://norecruits.com';
              //  }
             
             
          }}
      })
      .state('dashboard.studentInsert', {
        url: dashboardstudentI(),
        templateUrl: '/html/dashboard/studentDataInsert.html',
        controller: 'studentInsertCtrl',
        resolve: {result : function($window)
          {
              // var x =authFact.getLoginType();
              // if(localStorage.getItem("loginType") == 'admin')
              // {
                 
              // }
              //  else{
              //     $window.location.href='https://norecruits.com';
              //  }
                   
          }}
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/html/dashboard/dashboard.html',
        controller: 'dashboardController'
      })
      .state('dashboard.personalDetail', {
        url: dashboardPersonalDetail(),
        templateUrl: '/html/dashboard/dashboardPersonalDetail.html',
        controller: 'dashboardPersonalDetailController'
      })
      .state('dashboard.editDetails', {
        url: dashboardEdit(),
        templateUrl: '/html/dashboard/dashboardEdit.html',
        controller: 'dashboardEditController'
      })
      .state('dashboard.event', {
        url: dashboardEvent(),
        templateUrl: '/html/dashboard/dashboardEvent.html',
        controller: 'dashboardEventController'
      })
      .state('dashboard.eventShedule', {
        url: dashboardEventShedule(),
        templateUrl: '/html/dashboard/scheduler.html',
        controller: 'dashboardScheduleCtrl',
        resolve: {result : function($window)
          {
              // var x =authFact.getLoginType();
              // if(localStorage.getItem("loginType") == 'teacher' || localStorage.getItem("loginType") == 'studParent')
              // {
                 
              // }
              //  else{
              //     $window.location.href='https://norecruits.com';
              //  }
             
             
          }}
      })
      .state('dashboard.eventReschedule', {
        url: dashboardEventReschedule(),
        templateUrl: '/html/dashboard/rescheduler.html',
        controller: 'dashboardRescheduleCtrl'
      })

    
      .state('dashboard.conference', {
        url: dashboardConference(),
        templateUrl: '/html/dashboard/conference.html',
        controller: 'dashboardConfCtrl'
      })
      .state('dashboard.comingSoon', {
        url: dashboardComingSoon(),
        templateUrl: '/html/dashboard/comingSoon.html'
        
      })
      .state('dashboard.upcomingEvent', {
        url: upcomingEvent(),
        templateUrl: '/html/dashboard/upcomingEvent.html',
        controller: 'upcomingEventController'
      })
      .state('dashboard.history', {
        url: history(),
        templateUrl: '/html/dashboard/history.html',
        controller: 'historyController'
      })
     
      .state('dashboard.reportsUpload', {
        url: reportsUpload(),
        templateUrl: '/html/dashboard/reportsUpload.html',
        controller: 'reportsUploadCtl'
      })
      .state('dashboard.reportsUpdate', {
        url: reportsUpdate(),
        templateUrl: '/html/dashboard/reportsUpdate.html',
        controller: 'reportsUpdateCtl'
      })
      .state('dashboard.attendanceView', {
        url: attendanceView(),
        templateUrl: '/html/dashboard/attendanceView.html',
        controller: 'attendanceViewCtl'
      })
      .state('dashboard.adminCreate', {
        url: adminCreate(),
        templateUrl: '/html/dashboard/adminCreate.html',
        controller: 'adminCreateCtl'
      })
      .state('dashboard.allUser', {
        url: allUser(),
        templateUrl: '/html/dashboard/allUser.html',
        controller: 'allUserCtl'
      })
      .state('dashboard.allAdmin', {
        url: allAdmin(),
        templateUrl: '/html/dashboard/allAdmin.html',
        controller: 'allAdminCtl'
      })
      .state('dashboard.allSchool', {
        url: allSchool(),
        templateUrl: '/html/dashboard/allSchool.html',
        controller: 'allSchoolCtl'
      })
      .state('dashboard.contact', {
        url: contact(),
        templateUrl: '/html/dashboard/contact.html',
        controller: 'contactController'
      })
    
  });
  function contact() {
    return '/contact';
  }

function dashboardEdit() {
  return '/editDetails';
}
function upcomingEvent() {
  return '/upcomingEvent';
}
function history() {
  return '/history';
}
function dashboardEvent() {
  return '/event';
}
function dashboardPersonalDetail() {
  return '/personalDetail';
}
function dashboardEventShedule(){
  return '/eventShedule';
}
function dashboardEventReschedule(){
  return '/reschedule/:id';
}
function dashboardUserAuth(){
  return '/userAuth';
}
function dashboardstudentI(){
  return '/studentI';
}
function dashboardstudentI(){
  return '/studentI';
}
function dashboardTeacherI(){
   return '/teacherI';
}
function dashboardComingSoon(){
  return '/comingSoon';
}
function dashboardConference(){
  return '/dashboardConference';
}
function adminCreate(){
  return '/adminCreate';
}
function reportsUpload(){
  return '/reportsUpload';
}
function reportsUpdate(){
  return '/reportsUpdate';
}
function adminCreate(){
  return '/adminCreate';
}
function allUser(){
  return '/allUser';
}
function allAdmin(){
  return '/allAdmin';
}
function allSchool(){
  return '/allSchool';
}
function attendanceView(){
  return '/attendanceView';
}


