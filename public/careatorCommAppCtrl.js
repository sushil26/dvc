careatorApp.controller("careatorCommAppCtrl", function ($scope, $http, $timeout, $state) {
    console.log("Chat controller==>");

    //    httpFactory.getFile('property.json');
    //    console.log("$rootScope.propertyJson: "+JSON.stringify($rootScope.propertyJson));

$scope.gotToDashboard = function(){
    console.log("gotToDashboard-->");
    $state.go('dashboard', {});

}


    //var email = localStorage.getItem('careatorEmail');


})