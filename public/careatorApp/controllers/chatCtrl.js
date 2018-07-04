careatorApp.controller('chatCtrl', function ($scope, $rootScope, $filter, $window, careatorHttpFactory, careatorSessionAuth) {
    console.log("chatCtrl==>");
    var userData = careatorSessionAuth.getAccess("userData");
    console.log("userData: " + JSON.stringify(userData));

    $scope.getChatGroupListById = function (id) {
        console.log("getAllEmployee-->: " + id);
        var api = "https://norecruits.com/careator_chatGroupList/careator_getChatGroupListById/" + id;
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

    if (userData.chatRights == 'yes') {
        $scope.getChatGroupListById(localStorage.getItem("userId"));
    }

    $scope.groupDetails = function (index) {
        console.log("groupDetails-->");
        $scope.selectedType = "group";
        console.log(" $scope.allGroup[index]: " + JSON.stringify($scope.allGroup[index]));
        $scope.groupData = $scope.allGroup[index];
    }

    $scope.getAllChatRightEmp = function () {
        console.log("getAllChatRightEmp-->");
        var id = userData.userId;
        api = "https://norecruits.com/careator_getEmp/careator_getChatRightsAllemp/" + id;
        console.log("api: " + JSON.stringify(api));
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            if (checkStatus) {
                $scope.allEmp = data.data.data;
                console.log(" $scope.allEmp : " + JSON.stringify($scope.allEmp));
                console.log("data.data.message: " + data.data.message);
            }
            else {
                console.log("Sorry: " + data.data.message);
            }
        })
    }

    $scope.getEmpDetail = function (index) {
        console.log("getEmpDetail-->");
        $scope.selectedType = "individual";
        console.log(" $scope.selectedType : " + $scope.selectedType);
        $scope.individualData = $scope.allEmp[index];
        console.log(" $scope.individualData: " + JSON.stringify($scope.individualData));
    }

    $scope.sendText = function () {
        console.log("sendText-->");
        console.log("$scope.typedMessage: " + $scope.typedMessage);
        var api;
        var obj;
        if ($scope.selectedType == 'individual') {
            api = "https://norecruits.com/careator_individualText/individualText";
            obj = {
                "senderId": userData.userId,
                "receiverId": $scope.individualData._id,
                "senderName": userData.userName,
                "receiverName": $scope.individualData.name,
                "message": $scope.typedMessage
            }
        }
        else if ($scope.selectedType == 'group') {
            api = "https://norecruits.com/careator_groupText/groupText";
        }
        console.log("api: " + api);
        careatorHttpFactory.post(api, obj).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            if (checkStatus) {
                console.log("data.data.data: " + JSON.stringify(data.data.data));
                console.log(data.data.message);
            }
            else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
    }
    $scope.readText = function () {
        console.log("readText-->");
        var sId = userData.userId;
        var rId= $scope.individualData._id;
        var api = "https://norecruits.com/careator_individualTextRead/individualTextReadById/"+sId+"/"+rId;
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