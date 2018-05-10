app.controller('dashboardController', function ($scope, $window, httpFactory, $uibModal, sessionAuthFactory, $filter, $timeout) {
    console.log("dashboardController==>");

    $scope.userData = sessionAuthFactory.getAccess("userData");
    $scope.loginType = $scope.userData.loginType;
    $scope.userName = $scope.userData.userName;

    /* ##### Start dashboard submenu hide declaration ##### */
    $scope.sideBarMenu = false;
    $scope.events_subMenu = true;
    $scope.academic_subMenu = true;
    $scope.setting_subMenu = true;


    $scope.getToDate = function () {
        console.log("Get To Date-->");
        var api = "https://norecruits.com/vc/getToDate";
        httpFactory.get(api).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                console.log("data.data.data.date: " + data.data.data.date);
              
                console.log("todayDate: " + todayDate);
                var reqDate = todayDate.getDate();
                console.log("reqDate: " + reqDate);
                var reqMonth = todayDate.getMonth();
                var reqYear = todayDate.getFullYear();
                var reqHr = todayDate.getHours();
                var reqMin = todayDate.getMinutes();
                var reqSec = todayDate.getSeconds();

                $scope.todayDate = new Date(reqYear, reqMonth, reqDate, reqHr, reqMin, reqSec);

                $scope.tickInterval = 1000;
                var tick = function () {
                    console.log("tick")
                    var todayDate = new Date(data.data.data.date);
                  

                    $scope.hour = $filter('date')($scope.todayDate, 'HH');
                    $scope.min = $filter('date')($scope.todayDate, 'mm');
                    $scope.sec = $filter('date')($scope.todayDate, 'ss');
                    $timeout(tick, $scope.tickInterval);
                    console.log("tick")
                }
                $timeout(tick, $scope.tickInterval);

                console.log("consolidateDate: " + $scope.consolidateDate);
                // $scope.eventGet();
            } else {}
        })
        console.log("<--Get To Date");
    }
    $scope.getToDate();




    $scope.iconMenuClick = function () {
        console.log("iconMenuClick--> ");
        var element = document.getElementById("container");

        if (element.classList.contains("sidebar-closed")) {
            console.log("if is true");
            element.classList.remove("sidebar-closed");
            $scope.sideBarMenu = false;
            $scope.events_subMenu = true;
            $scope.academic_subMenu = true;
            $scope.setting_subMenu = true;
        } else {
            console.log("if is false");
            $scope.sideBarMenu = true;
            element.classList.add("sidebar-closed");
        }
        console.log("<--iconMenuClick");
    }

    $scope.eventClick = function (submenu) {
        console.log("eventClick-->: " + submenu);
        if (submenu == "events_subMenu") {
            if ($scope.events_subMenu == true) {
                $scope.events_subMenu = false;
            } else {
                $scope.events_subMenu = true;
            }
            $scope.academic_subMenu = true;
            $scope.setting_subMenu = true;
        } else if (submenu == "academic_subMenu") {
            console.log(" $scope.academic_subMenu : " + $scope.academic_subMenu);
            if ($scope.academic_subMenu == true) {
                $scope.academic_subMenu = false;
            } else {
                $scope.academic_subMenu = true;
            }
            $scope.events_subMenu = true;

            $scope.setting_subMenu = true;
        } else {
            if ($scope.setting_subMenu == true) {
                $scope.setting_subMenu = false;
            } else {
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