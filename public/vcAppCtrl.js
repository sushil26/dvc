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

  $rootScope.TimeTable_timing = ["09:00-09:45","9:45-10:30","10:30-11:15","11:15-12:00","01:00-01:45","01:45-02:30","02:30-03:15","03:15-04:00"]
});
