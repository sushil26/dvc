careatorApp.controller('createGroupCtrl', function ($scope, $rootScope, $filter, $window, careatorHttpFactory) {
    console.log("createGroupCtrl==>");

    var expanded = false;
    $scope.showCheckboxes = function () {
        var checkboxes = document.getElementById("checkboxes");
        if (!expanded) {
            checkboxes.style.display = "block";
            expanded = true;
        } else {
            checkboxes.style.display = "none";
            expanded = false;
        }
    }

})