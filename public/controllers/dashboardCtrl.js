app.controller('dashboardController', function ($scope, $rootScope, $window, httpFactory) {
    console.log("dashboardController==>");
    var id = localStorage.getItem("id");
    $scope.userData = sessionAuthFactory.getAccess("userData");
    $scope.loginType = $scope.userData.loginType;
    $rootScope.userName = $scope.userData.userName;
    

    $scope.logOut = function () {
        console.log("logOut-->");
        sessionAuthFactory.clearAccess();
        $scope.userData = sessionAuthFactory.getAccess("userData");
        window.location.href = "https://norecruits.com";
        console.log("<--logOut");
    }





})