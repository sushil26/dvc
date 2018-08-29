careatorApp.directive('capitalizeDirective', ['$parse', function ($parse) {
    return {
        restrict: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                console.log("capitalizeDirective-->");
                if (inputValue != null) {
                    inputValue = inputValue.toLowerCase();
                    resultInput = inputValue.substring(0, 1).toUpperCase() + input.substring(1);
                    console.log("resultInput: "+resultInput);;
                    return resultInput
                    
                }
                else{
                    return inputValue
                }


            });
        }


    }
}])