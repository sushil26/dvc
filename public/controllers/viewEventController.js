app.controller('viewEventController', function ($scope, $rootScope, $state, $window, httpFactory, $uibModal) {
    console.log("viewUserController==>");
    var id = $state.params.id;

    $scope.getEventDetails = function (id) {
        console.log("getTeacherData-->");
        var api = $scope.propertyJson.VC_getEventById + "/" + id;
        //var api = "http://localhost:5000/vc/eventGet"+ "/" + id;;
        httpFactory.get(api).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.eventDetails = data.data.data;
                console.log("$scope.eventDetails: "+ JSON.stringify($scope.eventDetails));            }
            else {
                //alert("Event get Failed");
            }
        })
        console.log("<--getTeacherData");
    }
    $scope.getEventDetails(id);
})