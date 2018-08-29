careatorApp.directive('capitalizeDirective', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, modelCtrl) {
            var model = $parse(attrs.ngModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    console.log("capitalizeDirective-->");
                    console.log("attrs.ngModel: "+$parse(attrs.ngModel))
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
        }

    }
}])