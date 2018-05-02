app.controller("vcAppCtrl", function ($scope, $rootScope, httpFactory, $window, $timeout, $state, $http, $uibModal, sessionAuthFactory) {
  console.log("controller==>");
  var loginModal; /* ### Note: get login modal instance on this variable ###*/
  var userName;
  $scope.userData = sessionAuthFactory.getAccess("userData");
  console.log(" $scope.userData : "+JSON.stringify( $scope.userData ));
  if ($scope.userData) {
    userName = $scope.userData.userName;
    // $scope.loginType = $scope.userData.loginType;
    console.log("userData: " + JSON.stringify($scope.userData));
    console.log("userName: " + userName);
    console.log("loginType: " + $scope.userData.loginType);
  }
  $scope.logVC = function (loginType, email, Password) {
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
      console.log("data.message: " + data.data.message);
      if (checkStatus) {
        var datas = data.data;
        console.log("data.message: " + data.data.message);
        if (data.data.message == 'Profile Inactive') {
          alert("Your Profile is inactive, inform your system admin to verify it");
        }
        else if (data.data.message == 'Login Successfully') {
          console.log("Login Successfully");
          alert("Logged in Successfull");

          $scope.sessionSet(datas);
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
        // if (data.data.loginType == 'admin') {
        //   $scope.sessionSet(datas);
        //   // document.getElementById("appLogin").style.display = 'none';
        //   // document.getElementById("appLogout").style.display = 'block';
        // }

      }
      else {
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

    if (typeof (Storage) !== "undefined") {
      if (data.data.loginType == 'teacher') {
        var userData = {
          "userName": data.data.teacherName,
          "status": data.data.status,
          "email": data.data.teacherEmail,
          "loginType": data.data.loginType,
          "id": data.data._id,
          "schoolName": data.data.schoolName,
        }
        console.log("userData: "+JSON.stringify(userData));
        sessionAuthFactory.setAccess(userData);

        $scope.userData = sessionAuthFactory.getAccess("userData");
        userName = $scope.userData.userName;
        $scope.loginType = $scope.userData.loginType;


      }
      else if (data.data.loginType == 'studParent') {
        var userData = {
          "userName": data.data.studName,
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
      }
      else if(data.data.loginType == 'admin'){
        var userData = {
          "userName": data.data.firstName,
          "status": data.data.status,
          "email": data.data.email,
          "loginType": data.data.loginType,
          "id": data.data._id,
          "schoolName": data.data.schoolName,
        }
        console.log("userData: "+JSON.stringify(userData));
        sessionAuthFactory.setAccess(userData);

        $scope.userData = sessionAuthFactory.getAccess("userData");
        userName = $scope.userData.userName;
        $scope.loginType = $scope.userData.loginType;

      }
      else{
        var userData = {
          "userName": data.data.firstName,
          "status": data.data.status,
          "email": data.data.email,
          "loginType": data.data.loginType,
          "id": data.data._id
         
        }
        console.log("userData: "+JSON.stringify(userData));
        sessionAuthFactory.setAccess(userData);

        $scope.userData = sessionAuthFactory.getAccess("userData");
        userName = $scope.userData.userName;
        $scope.loginType = $scope.userData.loginType;
      }
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
    sessionAuthFactory.clearAccess();
    $scope.userData = sessionAuthFactory.getAccess("userData");
    // userName = $scope.userData.userName;
    // $scope.loginType = $scope.userData.loginType;
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
