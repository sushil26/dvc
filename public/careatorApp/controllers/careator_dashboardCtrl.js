careatorApp.controller('careator_dashboardCtrl', function ($scope, $rootScope, $filter, careatorSessionAuth, careatorHttpFactory) {
    console.log("careator_dashboardCtrl==>");
    $scope.getChatGroupListById = function (id) {
        console.log("getAllEmployee-->: " + id);
        var api = "https://norecruits.com/careator_chatGroupList/careator_getChatGroupListById/" + id;
        console.log("api: " + api);
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.allemployee = data.data.data;
                console.log("allemployee: " + JSON.stringify($scope.allemployee));
                console.log(data.data.message);
            } else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
        console.log("<--getAllEmployee");
    }
    var userData = {
        "email": localStorage.getItem("email"),
        "userName": localStorage.getItem("userName"),
        "empId": localStorage.getItem("empId"),
        "userId": localStorage.getItem("userId")
    }
    if (localStorage.getItem("videoRights") == 'yes') {
        userData.videoRights = "yes";
    }
    if (localStorage.getItem("chatRights") == 'yes') {
        userData.chatRights = "yes";
        $scope.getChatGroupListById(localStorage.getItem("userId"));
    }

    careatorSessionAuth.setAccess(userData);
    var userData = careatorSessionAuth.getAccess("userData");
    console.log("userData: " + JSON.stringify(userData));


    ///////////////Hamburger/////////////////////////
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function () {
        $(this).toggleClass('open');
    });

    //////////////toggle//////////////////////////////
    $('.icon_menu').click(function () {

        $('#tog').removeClass("icon_menu");
        $('#tog').addClass("fa fa-plus kkkllkl");

    });
    $('.kkkllkl').click(function () {
        $('#tog').removeClass("fa fa-plus");
        $('#tog').removeClass("kkkllkl");
        $('#tog').addClass("icon_menu");


    });



})