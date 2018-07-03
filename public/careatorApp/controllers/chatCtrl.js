careatorApp.controller('chatCtrl', function ($scope, $rootScope, $filter, $window) {
    console.log("chatCtrl==>");

    $(".heading-compose").click(function () {
        $(".side-two").css({
            "left": "0"
        });
    });

    $(".newMessage-back").click(function () {
        $(".side-two").css({
            "left": "-100%"
        });
    });
})