careatorApp.controller('createGroupCtrl', function ($scope, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("createGroupCtrl==>");

$scope.names=['Chat','Video'];


    $scope.example14model = [];
    $scope.example14settings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true
    };
    $scope.example14data = [{
        "label": "Alabama",
        "id": "AL"
    }, {
        "label": "Alaska",
        "id": "AK"
    }]



})