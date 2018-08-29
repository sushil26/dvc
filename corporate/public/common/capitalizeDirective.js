careatorApp.directive('capitalizeDirective', ['$parse', function ($parse) {
    return {
        restrict: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue != null) {
                    inputValue = inputValue.toLowerCase();
                    return inputValue.substring(0, 1).toUpperCase() + input.substring(1);
                }
                else{
                    return inputValue
                }


            });
        }


    }
}])