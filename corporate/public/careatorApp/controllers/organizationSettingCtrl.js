careatorApp.controller('organizationSettingCtrl', function ($scope,  $rootScope, $state, careatorHttpFactory) {
    console.log("organizationSettingCtrl==>");
    $scope.propertyJson = $rootScope.propertyJson;
    console.log("$state.params.id: "+$state.params.id);
    var id = $state.params.id;
    $scope.getOrg_admin_byOrgId = function (id) {
        console.log("getOrg_admin_byOrgId-->");
        api = $scope.propertyJson.C_getOrg_admin_byOrgId+"/"+id;
        console.log("api: " + api);

        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            if (checkStatus) {
                console.log("data.data.data: " + JSON.stringify(data.data.data));
                console.log("data.data.message: " + data.data.message);
                $scope.orgDetails = data.data.data;
            }
            else {
                console.log("data.data.message: " + data.data.message);
            }
        })
    }
    $scope.getOrg_admin_byOrgId(id);
})