careatorApp.controller("careatorCommAppCtrl", function ($scope, $state, careatorSessionAuth, careatorHttpFactory, $uibModal, $timeout) {
    console.log("Chat controller==>");

    $scope.gotToDashboard = function () {
        console.log("gotToDashboard-->");
        $state.go('Cdashboard', {});
    }
    var loginModal; /* ### Note: get login modal instance on this variable ###*/
    var userName;

    $scope.cUserData = careatorSessionAuth.getAccess("userData");
    console.log(" $scope.userData : " + JSON.stringify($scope.cUserData));
    if ($scope.cUserData) {
        userName = $scope.cUserData.userName;
        // $scope.loginType = $scope.userData.loginType;
        console.log("cUserData: " + JSON.stringify($scope.cUserData));
        console.log("userName: " + userName);

    }

    $scope.logVC = function (email, password) {
        console.log("logVC from ");
        var obj = {
            "password": password,
            "careatorEmail": email
        };
        console.log("obj: " + JSON.stringify(obj));
        console.log("logVC");
        var api = "https://norecruits.com/careator/pswdCheck";
        console.log("api: " + api);
        careatorHttpFactory.post(api, obj).then(function (data) {
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            console.log("checkStatus" + checkStatus);
            console.log("data.message: " + data.data.message);
            if (checkStatus) {
                var datas = data.data;
                console.log("data.message: " + data.data.message);
                $scope.sessionSet(datas);
            } else {
                if (data.data.message == "You've already logged in. To log in again, please reset your session") {

                    $scope.checkObj = {
                        "password": password,
                        "careatorEmail": email
                    }
                    document.getElementById('notify_msg_content').innerHTML = data.data.message;
                    document.getElementById('resetBtn').style.display = 'inline';
                    $("#notify_msg_button").trigger("click");
                    resetId = data.data.data.id;
                }
                else {
                    console.log("sorry");
                    //alert("data.data.message");
                    var loginAlert = $uibModal.open({
                        scope: $scope,
                        templateUrl: '/careatorApp/common/loginAlert.html',
                        windowClass: 'show',
                        backdropClass: 'static',
                        keyboard: false,
                        controller: function ($scope, $uibModalInstance) {
                            $scope.message = data.data.message;
                            console.log("$scope.eventDetails: " + JSON.stringify($scope.eventDetails));
                            $scope.close = function () {
                                loginResetAlert.close('resetModel');
                            }
                        }
                    })
                    $timeout( function(){
                        loginAlert.close('resetModel');
                    }, 5000 );

                }
            }
        });

    }

    $scope.sessionSet = function (data) {
        console.log("sessionSet-->");
        console.log("data: " + JSON.stringify(data));
        console.log(" data.sessionData: " + data.sessionData);
        localStorage.setItem("careatorEmail", data.data.email);
        localStorage.setItem("sessionPassword", data.data.password);
        localStorage.setItem("sessionRandomId", data.data.sessionRandomId);
        localStorage.setItem("sessionEnc", data.sessionData);
        console.log("localStorage.getItem(sessionEnc): " + localStorage.getItem("sessionEnc"));
        if (typeof (Storage) !== "undefined") {
            var userData = {
                "email": data.data.email,
                "userName": data.data.name,
                "empId": data.data.empId,
                "userId": data.data._id,
                "sessionPassword": data.data.password,
                "sessionRandomId": data.data.sessionRandomId
            }
            if (data.data.videoRights == 'yes') {
                $scope.videoRights = "yes";
                userData.videoRights = "yes";
                localStorage.setItem("videoRights", 'yes');
            }
            if (data.data.chatRights == 'yes') {
                userData.chatRights = "yes";
                localStorage.setItem("chatRights", 'yes');
            }
            if (data.data.chatStatus) {
                userData.chatStatus = data.data.chatStatus;
            }
            console.log("localStorage.getItem(restrictedTo): " + JSON.stringify(localStorage.getItem("restrictedTo")));
            if (data.data.restrictedTo) {
                console.log("data.data.restrictedTo: " + JSON.stringify(data.data.restrictedTo));
                var restrictedTo = data.data.restrictedTo;
                var restrictedArray = [];
                for (var x = 0; x < restrictedTo.length; x++) {
                    restrictedArray.push(restrictedTo[x].userId);
                }

                localStorage.setItem("restrictedTo", restrictedArray);
                var restrictedUser = restrictedArray;

                userData.restrictedTo = restrictedArray;


                console.log("restrictedArray: " + JSON.stringify(restrictedArray));

            }
            if (data.data.profilePicPath) {
                userData.profilePicPath = data.data.profilePicPath;
            }
            var cUserData = userData;
            careatorSessionAuth.setAccess(cUserData);
            var cUserData = careatorSessionAuth.getAccess("cUserData");
            $scope.cUserData = cUserData;
            console.log("cUserData: " + JSON.stringify(cUserData));

            $state.go('Cdashboard.profile', {});

        } else {
            var loginAlert = $uibModal.open({
                scope: $scope,
                templateUrl: '/html/templates/dashboardwarning.html',
                windowClass: 'show',
                backdropClass: 'static',
                keyboard: false,
                controller: function ($scope, $uibModalInstance) {
                    $scope.message = "Sorry, your browser does not support Web Storage...";
                }
            })
        }
        console.log("<--sessionSet");
    }


    $scope.resetLoginFlag = function () {
        console.log("resetLoginFlag-->");
        // $("#notify_msg").modal('hide');
        var id = resetId;
        console.log("Obj ID  " + id);
        var api = "https://norecruits.com/careator_reset/resetLoginFlagsById/" + id;
        console.log("api: " + api);
        careatorHttpFactory.post(api, $scope.checkObj).then(function (data) {
            var checkStatus = careatorHttpFactory.dataValidation(data);
            if (checkStatus) {
                var datas = data.data;
                console.log("data.message: " + data.data.message);
                var loginResetAlert = $uibModal.open({
                    scope: $scope,
                    templateUrl: '/careatorApp/common/loginAlert.html',
                    windowClass: 'show',
                    backdropClass: 'static',
                    keyboard: false,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.message = data.data.message;
                        console.log("$scope.eventDetails: " + JSON.stringify($scope.eventDetails));
                        $scope.close = function () {
                            loginResetAlert.close('resetModel');
                        }
                    }
                })
                $timeout( function(){
                    loginResetAlert.close('resetModel');
                }, 5000 );
                //alert(data.data.message+" Now do click on login");
                // document.getElementById('notify_msg_content').innerHTML = data.data.message;
                // document.getElementById('resetBtn').style.display = 'inline';
                // $("#notify_msg_button").trigger("click");
                $timeout( function(){
                    $("#empLogin").trigger("click");
                }, 6000 );
               
            } else {
                console.log("sorry");
                //alert(data.data.message);
                var loginResetAlert = $uibModal.open({
                    scope: $scope,
                    templateUrl: '/careatorApp/common/loginAlert.html',
                    windowClass: 'show',
                    backdropClass: 'static',
                    keyboard: false,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.message = data.data.message;
                        console.log("$scope.eventDetails: " + JSON.stringify($scope.eventDetails));
                        $scope.close = function () {
                            loginResetAlert.close('resetModel');
                        }
                    }
                })
                $timeout( function(){
                    loginResetAlert.close('resetModel');
                }, 5000 );

            }
        })
    }



})