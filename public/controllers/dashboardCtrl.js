app.controller('dashboardController', function ($scope, $window, httpFactory, sessionAuthFactory) {
    console.log("dashboardController==>");

    $scope.userData = sessionAuthFactory.getAccess("userData");
    $scope.loginType = $scope.userData.loginType;
    $scope.userName = $scope.userData.userName;

    /* ##### Start dashboard submenu hide declaration ##### */
    $scope.events_subMenu = true;
    $scope.academic_subMenu = true;
    $scope.setting_subMenu = true;

    $scope.eventClick = function (submenu) {
        console.log("eventClick-->: " + submenu);
        if (submenu == "events_subMenu") {
            $scope.events_subMenu = false;
            $scope.academic_subMenu = true;
            $scope.setting_subMenu = true;
        }
        else if (submenu == "academic_subMenu") {
            $scope.events_subMenu = true;
            $scope.academic_subMenu = false;
            $scope.setting_subMenu = true;
        }
        else {
            $scope.events_subMenu = true;
            $scope.academic_subMenu = true;
            $scope.setting_subMenu = false;
        }
        console.log("<--eventClick: " + submenu);
    }
    /* ##### End dashboard submenu hide declaration ##### */



    $scope.logOut = function () {
        console.log("logOut-->");
        sessionAuthFactory.clearAccess();
        $scope.userData = sessionAuthFactory.getAccess("userData");
        window.location.href = "https://norecruits.com";
        console.log("<--logOut");
    }

    $scope.homeClick = function () {
        console.log("homeClick-->");
        window.location.href = "https://norecruits.com";
        console.log("<--homeClick");
    }








})