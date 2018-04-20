app.controller("vcAppCtrl", function ($scope, $rootScope, httpFactory, $window, $timeout, $state, $http, $uibModal) {
  console.log("controller==>");
  var loginModal; /* ### Note: get login modal instance on this variable ###*/

  if (localStorage.getItem("userData")) {
    console.log("User Name from session: " + localStorage.getItem("userData"));
    var userData = JSON.stringify(localStorage.getItem("userData"));
    userName = localStorage.getItem("userName");
    $scope.loginType = localStorage.getItem("loginType");
    console.log("userData: " + userData);
    console.log("userName: " + userName);
    console.log("loginType: " + $scope.loginType);
    // if (loginType == 'teacher') {
    //   document.getElementById("appLogin").style.display = 'none';
    //   document.getElementById("appLogout").style.display = 'block';
    // }
    // else if (loginType == 'admin') {
    //   document.getElementById("appLogin").style.display = 'none';
    //   document.getElementById("appLogout").style.display = 'block';
    // }
    // else if (loginType == 'studParent') {
    //   document.getElementById("appLogin").style.display = 'none';
    //   document.getElementById("appLogout").style.display = 'block';
    // }

  }
  else {

    var url = window.location.href;
    var stuff = url.split('/');
    var id1 = stuff[stuff.length - 2];
    var id2 = stuff[stuff.length - 3];
    console.log("stuff.length: " + stuff.length);
    console.log("id1**: " + id1);
    console.log("id2**: " + id2);
    if (stuff.length > 5) {
      if (localStorage.getItem("userName")) {
        console.log("User Name from session: " + localStorage.getItem("userName"));
        userName = localStorage.getItem("userName");
        document.getElementById("appLogin").style.display = 'none';
        document.getElementById("appLogout").style.display = 'block';
      }
      else {
        console.log("No user data from session");
        $('#setName').trigger('click');
      }
    }

  }
  $scope.logVC = function(loginType, email, Password) {
    console.log("logVC from signalingSocket.js");
    loginModal.close('resetModel');
       var obj = {
      "email": email,
      "password": Password,
      "loginType": loginType
    };
    console.log("obj: " + JSON.stringify(obj));
    console.log("logVC");
    var api = "https://norecruits.com/vc/login4VC";
    //var api = "http://localhost:5000/vc/teacherDetail" + "/" + id;
    //var api = "http://localhost:5000/vc/eventGet";
    console.log("api: " + api);
    httpFactory.post(api, obj).then(function (data) {
      var checkStatus = httpFactory.dataValidation(data);
      console.log("data--" + JSON.stringify(data.data));
      console.log("checkStatus" + checkStatus);
      console.log("data.message: "+data.data.message);
      if (checkStatus) {
        console.log("data.message: "+data.data.message);
        if (data.data.message == 'Profile Inactive') {
          alert("Your Profile is inactive, inform your system admin to verify it");
        }
        else if (data.data.message == 'Login Successfully') {
          console.log("Login Successfully");
          alert("Logged in Successfull");
          $scope.sessionSet(data);
          // document.getElementById("appLogin").style.display = 'none';
          // document.getElementById("appLogout").style.display = 'block';
          userName = data.data.userName;
        }
        else if (data.data.message == 'Password is wrong') {
          alert("Password is wrong");
        }
        else if (data.data.errorCode == 'No Match') {
          alert("There is no match for this EMail id from student database ");
        }
        if (data.data.loginType == 'admin') {
          $scope.sessionSet(data);
          // document.getElementById("appLogin").style.display = 'none';
          // document.getElementById("appLogout").style.display = 'block';
        }
      
      }
      else {
        console.log("sorry");
      }
    });

  }

  $scope.sessionSet = function(data) {
    console.log("sessionSet-->");
    console.log("data: " + JSON.stringify(data));
    console.log(" data.sessionData: " + data.sessionData);
    // var encryptedUrl = CryptoJS.AES.encrypt(data.sessionData.url,"url");
    // var encryptedPswd = CryptoJS.AES.encrypt(data.sessionData.pswd,"pswd");
    // localStorage.setItem("encUrl",encryptedUrl); 
    // localStorage.setItem("encPswd",encryptedPswd);
    localStorage.setItem("sessionEnc", data.sessionData);
    
    if (typeof (Storage) !== "undefined") {
      if (data.data.loginType == 'teacher') {
        var userData = {
          "userName": data.data.teacherName,
          "status": data.data.status,
          "email": data.data.teacherEmail,
          "loginType": data.loginType
        }
        localStorage.setItem("userData", userData);
        localStorage.setItem("userName", data.data.teacherName);
        localStorage.setItem("status", data.data.status);
        localStorage.setItem("email", data.data.teacherEmail);
        localStorage.setItem("loginType", data.loginType);
        localStorage.setItem("id", data.data._id);
        $scope.loginType =  localStorage.getItem("loginType");
      }
      else if (data.data.loginType == 'studParent') {
        var userData = {
          "userName": data.data.studName,
          "status": data.data.status,
          "email": data.data.parentEmail,
          "loginType": data.loginType
        }
        localStorage.setItem("userData", userData);
        localStorage.setItem("userName", data.data.studName);
        localStorage.setItem("status", data.data.status);
        localStorage.setItem("email", data.data.parentEmail);
        localStorage.setItem("loginType", data.loginType);
        localStorage.setItem("id", data.data._id);
        $scope.loginType =  localStorage.getItem("loginType");
      }
      else {
        var userData = {
          "userName": data.data.userName,
          "status": data.data.status,
          "email": data.data.email,
          "loginType": data.data.loginType
        }
        localStorage.setItem("userData", userData);
        localStorage.setItem("userName", data.data.userName);
        localStorage.setItem("status", data.data.status);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("loginType", data.data.loginType);
        $scope.loginType =  localStorage.getItem("loginType");
      }
      var info = localStorage.getItem("userData");
      console.log("info: " + JSON.stringify(info));
      userName = info.userName;
    } else {
      alert("Sorry, your browser does not support Web Storage...");
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

  $scope.vcLogout = function () {
    console.log("vcLogout-->");
    localStorage.removeItem("userData");
    localStorage.removeItem("userName");
    localStorage.removeItem("status");
    localStorage.removeItem("email");
    localStorage.removeItem("loginType");
    $scope.loginType=localStorage.getItem("loginType");
    console.log("<--vcLogout");
  };

  $rootScope.TimeTable_timing = [
    { "startsAt": "09:00", "endsAt": "09:45", "meridian": 'AM' },
    { "startsAt": "9:45", "endsAt": "10:30", "meridian": 'AM' },
    { "startsAt": "10:30", "endsAt": "11:15", "meridian": 'AM' },
    { "startsAt": "11:15", "endsAt": "12:00", "meridian": 'AM' },
    { "startsAt": "01:00", "endsAt": "01:45", "meridian": 'PM' },
    { "startsAt": "01:45", "endsAt": "02:30", "meridian": 'PM' },
    { "startsAt": "02:30", "endsAt": "03:15", "meridian": 'PM' },
    { "startsAt": "03:15", "endsAt": "04:00", "meridian": 'PM' }]
});
