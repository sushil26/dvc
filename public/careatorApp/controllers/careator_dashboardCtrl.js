careatorApp.controller('careator_dashboardCtrl', function ($scope, $rootScope, $filter, $timeout, careatorSessionAuth, careatorHttpFactory) {
    console.log("careator_dashboardCtrl==>");
    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000 //ms
    $scope.propertyJson = $rootScope.propertyJson;

    var tick = function () {
        $scope.clock = new Date()
        $scope.hour = $filter('date')($scope.clock, 'HH');
        $scope.min = $filter('date')($scope.clock, 'mm');
        $scope.sec = $filter('date')($scope.clock, 'ss');
        $timeout(tick, $scope.tickInterval); // reset the timer
    }
    // Start the timer
    $timeout(tick, $scope.tickInterval);

    var userData = careatorSessionAuth.getAccess("userData");
    console.log("userData==>: " + userData);
    if (userData == undefined) {

        var userData = {
            "email": localStorage.getItem("email"),
            "userName": localStorage.getItem("userName"),
            "empId": localStorage.getItem("empId"),
            "userId": localStorage.getItem("userId"),
        }
        if (localStorage.getItem("videoRights") == 'yes') {
            $scope.videoRights = "yes";
            userData.videoRights = "yes";
        }
        if (localStorage.getItem("chatRights") == 'yes') {
            userData.chatRights = "yes";
            // $scope.getChatGroupListById(localStorage.getItem("userId"));
        }
        console.log("localStorage.getItem(restrictedTo): " + JSON.stringify(localStorage.getItem("restrictedTo")));
        if (localStorage.getItem("restrictedTo")) {
            var restrictedUser = localStorage.getItem("restrictedTo");
            var restrictedArray = restrictedUser.split(',');
            console.log(" restrictedArray: " + JSON.stringify(restrictedArray));
            userData.restrictedTo = restrictedArray;
        }

        careatorSessionAuth.setAccess(userData);
        var userData = careatorSessionAuth.getAccess("userData");
        console.log("userData: " + JSON.stringify(userData));
    }

    $scope.name = userData.userName;
    if (userData.videoRights) {
        $scope.videoRights = "yes";
    }

    $scope.logout = function () {
        console.log("logout-->");
        localStorage.removeItem("careatorEmail");
        localStorage.removeItem("sessionUrlId");
        localStorage.removeItem("careator_remoteEmail");
        localStorage.removeItem("videoRights");
        localStorage.removeItem("chatRights");
        localStorage.removeItem("sessionUrlId");
        localStorage.removeItem("careator_remoteEmail");
        careatorSessionAuth.clearAccess("userData");
        window.location.href = "https://norecruits.com";
    }

    socket.on('comm_aboutUserEdit', function (data) {
        console.log("***comm_aboutUserEdit-->");
        if (data.id == userData.userId) {
            var id = userData.userId;
            var api = "https://norecruits.com/careator_getUser/careator_getUserById/" + id;
            console.log("api: " + api);
            careatorHttpFactory.get(api).then(function (data) {
                console.log("data--" + JSON.stringify(data.data));
                var checkStatus = careatorHttpFactory.dataValidation(data);
                if (checkStatus) {
                    $scope.getUserById = data.data.data[0];
                    console.log("getUserById: " + JSON.stringify($scope.getUserById));
                    console.log("userData: " + JSON.stringify(userData));
                    var restrictedTo = $scope.getUserById.restrictedTo;
                    var restrictedArray = [];
                    for (var x = 0; x < restrictedTo.length; x++) {
                        restrictedArray.push(restrictedTo[x].userId);
                    }
                    console.log("restrictedArray: " + JSON.stringify(restrictedArray));
                    $scope.restrictedArray = restrictedArray;
                    var userData = {
                        "email": $scope.getUserById.email,
                        "userName": $scope.getUserById.name,
                        "empId": $scope.getUserById.empId,
                        "userId": $scope.getUserById._id,
                        "restrictedTo": restrictedArray
                    }
                    if ($scope.getUserById.videoRights == 'yes' && $scope.getUserById.chatRights == 'yes') {
                        userData.videoRights = "yes";
                        userData.chatRights = "yes";
                        $scope.videoRights = "yes";
                    }
                    else if ($scope.getUserById.chatRights == 'yes'  && $scope.getUserById.chatRights == 'no') {
                        userData.chatRights = "yes";
                        userData.videoRights = "no";
                        $scope.videoRights = "no";
                    }
                    else if ($scope.getUserById.chatRights == 'no'  && $scope.getUserById.chatRights == 'yes') {
                        userData.chatRights = "no";
                        userData.videoRights = "yes";
                        $scope.videoRights = "yes";
                    }
                    console.log("userData.restrictedTo: " + JSON.stringify(userData.restrictedTo));
                    careatorSessionAuth.clearAccess("userData");
                    careatorSessionAuth.setAccess(userData);
                    var userData = careatorSessionAuth.getAccess("userData");
                    console.log("***userData: " + JSON.stringify(userData));
                    console.log(data.data.message);
                } else {
                    console.log("Sorry");
                    console.log(data.data.message);
                }
            })
        }
    })




    ///////////////Hamburger/////////////////////////
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function () {
        $(this).toggleClass('open');
    });

    //////////////toggle//////////////////////////////
    $('#tog').click(function () {

        $('#tog').css({
            "display": "none"
        });
        $('#fog').css({
            "display": "inline"
        });

    });
    $('#fog').click(function () {

        $('#tog').css({
            "display": "inline"
        });
        $('#fog').css({
            "display": "none"
        });

    });





})