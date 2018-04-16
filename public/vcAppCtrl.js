app.controller("vcAppCtrl", function(
  $scope,$rootScope,
  httpFactory,
  $window,
  $timeout,
  $state,
  $http
) {
  console.log("controller==>");

  $scope.vcLogout = function() {
    console.log("vcLogout");
    window.location = "https://norecruits.com/client";
    localStorage.removeItem("userData");
    localStorage.removeItem("userName");
    localStorage.removeItem("status");
    localStorage.removeItem("email");
    localStorage.removeItem("loginType");
    document.getElementById("appLogin").style.display = "block";
    document.getElementById("appLogout").style.display = "none";
    document.getElementById("videoConferenceUrl").style.display = "none";
    document.getElementById("scheduleMeeting").style.display = "none";
    document.getElementById("videoConferenceLinkExtention").style.display =
      "none";
  };

  $rootScope.TimeTable_timing = [
    {"startsAt":"09:00:00 AM","endsAt":"09:45:00 AM"},
  {"startsAt":"9:45:00 AM","endsAt":"10:30:00 AM"},
  {"startsAt":"10:30:00 AM", "endsAt":"11:15:00 AM"},
  {"startsAt":"11:15:00 AM","endsAt":"12:00:00 AM"},
  {"startsAt":"01:00:00 PM", "endsAt":"01:45:00 PM"},
  {"startsAt":"01:45:00 PM", "endsAt":"02:30:00 PM"},
  {"startsAt":"02:30:00 PM","endsAt":"03:15:00 PM"},
  {"startsAt":"03:15:00 PM", "endsAt":"04:00:00 PM"}]
});
