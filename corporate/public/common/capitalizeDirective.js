careatorApp.directive('capitalizeDirective', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            var model = $parse(attrs.ngModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.modelValue = function () {
                    console.log('modelvalue - ' + ngModel.$viewValue);
                    //return ngModel.$viewValue;
                };
                scope.$apply(function () {
                    console.log("capitalizeDirective-->");
                    console.log("attrs.ngModel: "+$parse(attrs.ngModel))
                    console.log("modelSetter: "+modelSetter);
                    
                    inputValue = modelSetter.toLowerCase();
                    resultInput = inputValue.substring(0, 1).toUpperCase() + modelSetter.substring(1);
                    // console.log("file from filemodel cutom drctve: " + element.files);
                    // console.log("element[0].files[0] from filemodel cutom drctve: " + element.file);
                    // console.log("element[0].files[0] from filemodel cutom drctve: " + JSON.stringify(element));
                    // console.log("element[0].files[0] from filemodel cutom drctve: " + JSON.stringify(element[0].files));
                    // console.log("element[0].files[0] from filemodel cutom drctve: " + JSON.stringify(element[0].files[0]));
                    console.log("resultInput: " + resultInput);;
                    modelSetter(scope, resultInput);
                });
            });
            // modelCtrl.$parsers.push(function (inputValue) {

               
            //     input = inputValue.toLowerCase();
            //     return inputValue.substring(0,1).toUpperCase()+inputValue.substring(1);
                    
            //   });
        }

    }
}])