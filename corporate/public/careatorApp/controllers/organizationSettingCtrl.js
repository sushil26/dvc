careatorApp.controller('organizationSettingCtrl', function ($scope,  $rootScope, $state, careatorHttpFactory) {
    console.log("organizationSettingCtrl==>");
    $scope.propertyJson = $rootScope.propertyJson;
    console.log("$state.params.id: "+$state.params.id);
})