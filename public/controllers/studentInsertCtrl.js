app.controller('studentInsertCtrl', function ($scope, $window, httpFactory) {
    console.log("studInsertCtrl==>");
    console.log("$scope.parentName: "+$scope.parentName);

    $scope.cs = [{ "class": "", "section": ""}];
  
    $scope.saveStudent = function(){
        console.log("saveStudent-->");

        var obj ={

            "schoolName": $scope.schoolName,
            "studId": $scope.studId,
            "studName": $scope.studName,
            "parentName" : $scope.parentName,
            "parentEmail": $scope.parentEmail,
            "mobileNum": $scope.mobileNum,
            "cs": $scope.cs,
            "pswd": $scope.pswd
        }
        console.log("obj: " + JSON.stringify(obj));
        
        var api = "https://norecruits.com/vc/studentInsert";
        httpFactory.post(api, obj).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
  
              console.log("data" + JSON.stringify(data.data))
              // $window.location.href = $scope.propertyJson.R082;
              alert("Successfully teacher inserted " + data.data.message);
             
            }
            else {
              alert("Teacher Insert Fail");
  
            }
  
          })

        console.log("<--saveStudent");
    }

    console.log("<==studInsertCtrl");
})