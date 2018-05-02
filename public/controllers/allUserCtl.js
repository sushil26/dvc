app.controller('allUserCtl', function ($scope, $window, httpFactory, sessionAuthFactory) {
    console.log("allUserCtl==>");
    $scope.userData = sessionAuthFactory.getAccess("userData");
   
    console.log(" $scope.userData : " + JSON.stringify($scope.userData));
})