app.controller("vcAppCtrl", function ($scope, $rootScope, httpFactory, $window,sessionAuthFactory, $uibModal, SweetAlert) {
  console.log("controller==>");

  $scope.checkCredential =function(email, Password) {
    console.log("checkCredential-->");
    $('#myEmailModal').modal('hide');
    var password = document.getElementById("careatorPswd").value;
    var careatorEmail = document.getElementById("careatorEmail").value;
    var obj = {
      "password": Password,
      "careatorEmail": email
    };
    console.log("obj: " + JSON.stringify(obj));
    var api = "careator/pswdCheck";
    console.log("api: " + api);
    if (password != "" && careatorEmail != "") {


      httpFactory.post(api, obj).then(function (data) {
        var checkStatus = httpFactory.dataValidation(data);
        console.log("data--" + JSON.stringify(data.data));
        console.log("checkStatus" + checkStatus);
        console.log("data.message: " + data.data.message);
        if (checkStatus) {
          var datas = data.data;
          console.log("data.message: " + data.data.message);
          console.log("data: " + JSON.stringify(data))

          localStorage.setItem("careatorEmail", careatorEmail);
          localStorage.setItem("userName", data.data.name);
          localStorage.setItem("empId", data.data.empId);
          localStorage.setItem("email", data.data.email);
          localStorage.setItem("userId", data.data._id);
          localStorage.setItem("sessionPassword", password);
          localStorage.setItem("sessionRandomId", data.data.sessionRandomId);
          localStorage.setItem("sessionEnc", data.sessionData);
          userName = localStorage.getItem("userName");
          if (data.data.videoRights == 'yes') {
            localStorage.setItem("videoRights", 'yes');
            document.getElementById("videoConfStart").style.display = "inline";
            document.getElementById("scheduleVC").style.display = "inline";
            $("#buttonpage").css({
              "min-height": "auto"
              
            });
          }
          if (data.data.chatRights == 'yes') {
            localStorage.setItem("chatRights", 'yes');
            document.getElementById("chatConfStart").style.display = "inline";
          }
          if (data.data.chatStatus) {
            localStorage.setItem("chatStatus", data.data.chatStatus);
          }
          if (data.data.restrictedTo) {
            console.log("data.data.restrictedTo: " + JSON.stringify(data.data.restrictedTo));
            var restrictedTo = data.data.restrictedTo;
            var restrictedArray = [];
            for (var x = 0; x < restrictedTo.length; x++) {
              restrictedArray.push(restrictedTo[x].userId);
            }
  
            console.log("restrictedArray: " + restrictedArray);
            localStorage.setItem("restrictedTo", restrictedArray);
          }
          if (data.data.profilePicPath) {
            localStorage.setItem("profilePicPath", data.data.profilePicPath);
          }
  
          console.log("userName: " + userName);
          document.getElementById("videoConferenceUrl").style.display = "block";
          // $('#myPasswordModal').modal('hide');
          window.location.href = "https://norecruits.com/careatorApp/#!/dashboard/profile";
        },
        error: function (err) {
          console.log("err: " + JSON.stringify(err));
          console.log("err.responseText: " + JSON.stringify(err.responseText));
          console.log("err.responseJSON: " + JSON.stringify(err.responseJSON.message));
          if (err.responseJSON.message == "You've already logged in. To log in again, please reset your session") {
  
            checkObj = {
              "password": password,
              "careatorEmail": careatorEmail
            }
            console.log("You already logged in, please logout your old session in-order to login");
            document.getElementById('notify_msg_content').innerHTML = err.responseJSON.message;
            document.getElementById('resetBtn').style.display = 'inline';
            $("#notify_msg_button").trigger("click");
             
            resetId = err.responseJSON.data.id;
  
          } else {
            // alert(err.responseJSON.message);
            $("#alertButton").trigger("click");
             
            var x =
              document.getElementById('alertcontent').innerHTML = err.responseJSON.message + "<br>Please try with correct password or contact Admin";
          }
          document.getElementById("videoConferenceUrl").style.display = "none";
          localStorage.removeItem("careatorEmail");
          userName = "";
        }
      });
    } else {
      console.log("password trigger again-->");
      console.log("Password empty");
    }
    console.log("<--checkCredential");
  }

  //document.getElementById('mobile-nav').style.display='none';
  var loginModal; /* ### Note: get login modal instance on this variable ###*/
  var userName;
  httpFactory.getFile('property.json');
  $scope.userData = sessionAuthFactory.getAccess("userData");
  console.log(" $scope.userData : " + JSON.stringify($scope.userData));
  if ($scope.userData) {
    userName = $scope.userData.userName;
    // $scope.loginType = $scope.userData.loginType;
    console.log("userData: " + JSON.stringify($scope.userData));
    console.log("userName: " + userName);
    console.log("loginType: " + $scope.userData.loginType);
  }
  $scope.logVC = function (loginType, email, Password) {
    console.log("logVC from ");
    // loginModal.close('resetModel');
    var obj = {
      "email": email,
      "password": Password,
      "loginType": loginType
    };
    console.log("obj: " + JSON.stringify(obj));
    console.log("logVC");
    var api = "vc/login4VC";
    //var api = "http://localhost:5000/vc/teacherDetail" + "/" + id;
    //var api = "http://localhost:5000/vc/eventGet";
    console.log("api: " + api);
    httpFactory.post(api, obj).then(function (data) {
      var checkStatus = httpFactory.dataValidation(data);
      console.log("data--" + JSON.stringify(data.data));
      console.log("checkStatus" + checkStatus);
      console.log("data.message: " + data.data.message);
      if (checkStatus) {
        var datas = data.data;
        console.log("data.message: " + data.data.message);
        if (data.data.message == 'Profile Inactive') {
          var loginAlert = $uibModal.open({
            scope: $scope,
            templateUrl: '/html/templates/loginAlert.html',
            windowClass: 'show',
            backdropClass: 'static',
            keyboard: false,
            controller: function ($scope, $uibModalInstance) {
              $scope.message = "Your Profile is inactive, inform your system admin to verify it";
              console.log("$scope.eventDetails: " + JSON.stringify($scope.eventDetails));
            }
          })
          //alert("Your Profile is inactive, inform your system admin to verify it");
        } else if (data.data.message == 'Login Successfully') {
          console.log("Login Successfully");

          $scope.sessionSet(datas);
          userName = data.data.userName;
        } else {
          var loginAlert = $uibModal.open({
            scope: $scope,
            templateUrl: '/html/templates/loginAlert.html',
            windowClass: 'show',
            backdropClass: 'static',
            keyboard: false,
            controller: function ($scope, $uibModalInstance) {
              $scope.message = data.data.message;
              console.log("$scope.eventDetails: " + JSON.stringify($scope.eventDetails));
              $scope.close = function () {
                loginAlert.close('resetModel');

              }
            }
          })

        }
      } else {
        console.log("sorry");
      }
    });

  }

  $scope.sessionSet = function (data) {
    console.log("sessionSet-->");
    console.log("data: " + JSON.stringify(data));
    console.log(" data.sessionData: " + data.sessionData);
    // var encryptedUrl = CryptoJS.AES.encrypt(data.sessionData.url,"url");
    // var encryptedPswd = CryptoJS.AES.encrypt(data.sessionData.pswd,"pswd");
    // localStorage.setItem("encUrl",encryptedUrl); 
    // localStorage.setItem("encPswd",encryptedPswd);
    localStorage.setItem("sessionEnc", data.sessionData);
    console.log("localStorage.getItem(sessionEnc): " + localStorage.getItem("sessionEnc"));
    if (typeof (Storage) !== "undefined") {
      if (data.data.loginType == 'teacher') {
        var un = data.data.firstName + " " + data.data.lastName
        var userData = {
          "userName": un,
          "status": data.data.status,
          "email": data.data.teacherEmail,
          "loginType": data.data.loginType,
          "id": data.data._id,
          "schoolName": data.data.schoolName,
        }
        console.log("userData: " + JSON.stringify(userData));
        sessionAuthFactory.setAccess(userData);

        $scope.userData = sessionAuthFactory.getAccess("userData");
        userName = $scope.userData.userName;
        $scope.loginType = $scope.userData.loginType;
        $window.location.reload();

      } else if (data.data.loginType == 'studParent') {
        var un = data.data.firstName + " " + data.data.lastName
        var userData = {
          "userName": un,
          "status": data.data.status,
          "email": data.data.parentEmail,
          "loginType": data.data.loginType,
          "id": data.data._id,
          "schoolName": data.data.schoolName
        }
        sessionAuthFactory.setAccess(userData);

        $scope.userData = sessionAuthFactory.getAccess("userData");
        userName = $scope.userData.userName;
        $scope.loginType = $scope.userData.loginType;
        $window.location.reload();
      } else if (data.data.loginType == 'admin') {
        var un = data.data.firstName + " " + data.data.lastName
        var userData = {
          "userName": un,
          "status": data.data.status,
          "email": data.data.email,
          "loginType": data.data.loginType,
          "id": data.data._id,
          "schoolName": data.data.schoolName,
        }
        console.log("userData: " + JSON.stringify(userData));
        sessionAuthFactory.setAccess(userData);

        $scope.userData = sessionAuthFactory.getAccess("userData");
        userName = $scope.userData.userName;
        $scope.loginType = $scope.userData.loginType;
        $window.location.reload();
      } else {
        var un = data.data.firstName + " " + data.data.lastName
        var userData = {
          "userName": un,
          "status": data.data.status,
          "email": data.data.email,
          "loginType": data.data.loginType,
          "id": data.data._id

        }
        console.log("userData: " + JSON.stringify(userData));
        sessionAuthFactory.setAccess(userData);
        $scope.userData = sessionAuthFactory.getAccess("userData");
        userName = $scope.userData.userName;
        $scope.loginType = $scope.userData.loginType;
        $window.location.reload();
      }
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
  $scope.vcLogin = function () {
    console.log("vcLogin-->");
    loginModal = $uibModal.open({
      scope: $scope,
      templateUrl: '/html/templates/loginPopup.html',
      windowClass: 'show',
      backdropClass: 'show',
      controller: function ($scope, $uibModalInstance) {
        console.log("<--vcLogin");
      }
    })
  }
  $rootScope.TimeTable_timing = [{
      "startsAt": "09:00",
      "endsAt": "09:45",
      "meridian": 'AM'
    },
    {
      "startsAt": "9:45",
      "endsAt": "10:30",
      "meridian": 'AM'
    },
    {
      "startsAt": "10:30",
      "endsAt": "11:15",
      "meridian": 'AM'
    },
    {
      "startsAt": "11:15",
      "endsAt": "12:00",
      "meridian": 'AM'
    },
    {
      "startsAt": "01:00",
      "endsAt": "01:45",
      "meridian": 'PM'
    },
    {
      "startsAt": "01:45",
      "endsAt": "02:30",
      "meridian": 'PM'
    },
    {
      "startsAt": "02:30",
      "endsAt": "03:15",
      "meridian": 'PM'
    },
    {
      "startsAt": "03:15",
      "endsAt": "04:00",
      "meridian": 'PM'
    }
  ];



});