careatorApp.controller('chatCtrl', function ($scope, $rootScope, $filter, $window, careatorHttpFactory, careatorSessionAuth) {
    console.log("chatCtrl==>");
    var userData = careatorSessionAuth.getAccess("userData");
    console.log("userData: " + JSON.stringify(userData));
 
    $scope.getChatGroupListById = function (id) {
        console.log("getAllEmployee-->: "+id);
        var api = "https://norecruits.com/careator_chatGroupList/careator_getChatGroupListById/"+id;
        console.log("api: " + api);
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.allGroup = data.data.data;
                console.log("allemployee: " + JSON.stringify($scope.allGroup));
                console.log(data.data.message);
            }
            else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
        console.log("<--getAllEmployee");
    }

    if(userData.chatRights=='yes'){
        $scope.getChatGroupListById(localStorage.getItem("userId"));
    }

    $scope.groupDetails = function(index){
        console.log("groupDetails-->");
        console.log(" $scope.allGroup[index]: "+JSON.stringify($scope.allGroup[index]));
        $scope.groupData = $scope.allGroup[index];

    }






    /* ### Start: Front end  CSS### */
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
    /* ### End: Front end CSS ### */
})