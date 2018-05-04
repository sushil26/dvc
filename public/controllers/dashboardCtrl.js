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
            if ($scope.events_subMenu == true) {
                $scope.events_subMenu = false;
            }
            else {
                $scope.events_subMenu = true;
            }
            $scope.academic_subMenu = true;
            $scope.setting_subMenu = true;
        }
        else if (submenu == "academic_subMenu") {
            console.log(" $scope.academic_subMenu : "+ $scope.academic_subMenu );
            if ($scope.academic_subMenu == true) {
                $scope.academic_subMenu = false;
            }
            else {
                $scope.academic_subMenu = true;
            }
            $scope.events_subMenu = true;

            $scope.setting_subMenu = true;
        }
        else {
            if ($scope.setting_subMenu == true) {
                $scope.setting_subMenu = false;
            }
            else {
                $scope.setting_subMenu = true;
            }
            $scope.events_subMenu = true;
            $scope.academic_subMenu = true;

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