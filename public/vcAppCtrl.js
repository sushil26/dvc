app.controller("vcAppCtrl", function ($scope, $rootScope, httpFactory, $window, $timeout, $state, $http, $uibModal) {
  console.log("controller==>");
  var dayEventmodal;

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

  function logVC() {
    console.log("logVC from signalingSocket.js");
    // console.log("email: " + document.getElementById("crdEmail").value);
    // var email = document.getElementById("crdEmail").value;
    // var Password = document.getElementById('crdPswd').value;
    // alert($("input[name=loginType]:checked").val());
    // var loginType = $("input[name=loginType]:checked").val();
    // console.log("email: " + email);
    var obj = {
      "email": $scope.email,
      "password": $scope.Password,
      "loginType": $scope.loginType
    };
    console.log("obj: " + JSON.stringify(obj));
    console.log("logVC");
    var api = "https://norecruits.com/vc/login4VC";
    //var api = "http://localhost:5000/vc/teacherDetail" + "/" + id;
    //var api = "http://localhost:5000/vc/eventGet";
    console.log("api: " + api);
    httpFactory.post(api, obj).then(function (data) {
      var checkStatus = httpFactory.dataValidation(data);
      // console.log("data--" + JSON.stringify(data.data));
      if (checkStatus) {
        if (data.message == 'Profile Inactive') {
          alert("Your Profile is inactive, inform your system admin to verify it");
        }
        else if (data.message == 'Login Successfully') {
          alert("Logged in Successfull");
          sessionSet(data);
          document.getElementById("appLogin").style.display = 'none';
          document.getElementById("appLogout").style.display = 'block';
          userName = data.data.userName;
        }
        else if (data.message == 'Password is wrong') {
          alert("Password is wrong");
        }
        else if (data.errorCode == 'No Match') {
          alert("There is no match for this EMail id from student database ");
        }
        if (data.loginType == 'admin') {
          sessionSet(data);
          document.getElementById("appLogin").style.display = 'none';
          document.getElementById("appLogout").style.display = 'block';
        }
      
      }
      else {
      }
    });

  }

  function sessionSet(data) {
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
      }
      var info = localStorage.getItem("userData");
      console.log("info: " + JSON.stringify(info));
      userName = info.userName;
    } else {
      alert("Sorry, your browser does not support Web Storage...");
    }
    console.log("<--sessionSet");
  }
  function regVc() {
    console.log("regVc");
    var un = document.getElementById("regVC_un").value;
    var emId = document.getElementById("regVC_emailId").value;
    var pswd = document.getElementById("regVC_pswd").value;
    var obj = {
      "userName": un,
      "email": emId,
      "password": pswd
    };
    $.ajax({
      url: "https://norecruits.com/vc/register4VC",
      //url: "http://localhost:5000/vc/register4VC",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: 'json',
      success: function (data) {
        console.log("data: " + JSON.stringify(data));
        if (data.message == 'Failed to Register' || data.message == 'empty value found') {
          alert("Failed to register try again");
        }
        else if (data.message == 'Registeration Successfull') {
          alert("Registeration Successfull");
        }
      }
    })
  }

  function vcLogout() {
    console.log("vcLogout");
    localStorage.removeItem("userData");
    localStorage.removeItem("userName");
    localStorage.removeItem("status");
    localStorage.removeItem("email");
    localStorage.removeItem("loginType");
    localStorage.removeItem("id");
    localStorage.removeItem("css");
    // document.getElementById("appLogout").style.display = 'none';
    // document.getElementById("appLogin").style.display = 'block';
  }

  $scope.loginClick = function () {
    console.log("loginClick-->");
    dayEventmodal = $uibModal.open({
      scope: $scope,
      templateUrl: '/html/templates/loginPopup.html',
      windowClass: 'show',
      backdropClass: 'show',
      controller: function ($scope, $uibModalInstance) {
        console.log("<--loginClick");
      }
    })
  }

  $scope.vcLogout = function () {
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
    { "startsAt": "09:00", "endsAt": "09:45", "meridian": 'AM' },
    { "startsAt": "9:45", "endsAt": "10:30", "meridian": 'AM' },
    { "startsAt": "10:30", "endsAt": "11:15", "meridian": 'AM' },
    { "startsAt": "11:15", "endsAt": "12:00", "meridian": 'AM' },
    { "startsAt": "01:00", "endsAt": "01:45", "meridian": 'PM' },
    { "startsAt": "01:45", "endsAt": "02:30", "meridian": 'PM' },
    { "startsAt": "02:30", "endsAt": "03:15", "meridian": 'PM' },
    { "startsAt": "03:15", "endsAt": "04:00", "meridian": 'PM' }]
});
