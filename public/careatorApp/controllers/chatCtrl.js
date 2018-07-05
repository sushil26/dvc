careatorApp.controller('chatCtrl', function ($scope, $rootScope, $filter, $window, careatorHttpFactory, careatorSessionAuth) {
    console.log("chatCtrl==>");
    var userData = careatorSessionAuth.getAccess("userData");
    $scope.userId = userData.userId;
    console.log("userData: " + JSON.stringify(userData));

    $scope.getChatGroupListById = function (id) {
        console.log("getAllEmployee-->: " + id);
        var api = "https://norecruits.com/careator_chatGroupList/careator_getChatGroupListById/" + id;
        console.log("api: " + api);
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            if (checkStatus) {
                $scope.allGroup = data.data.data;
                console.log("allGroup: " + JSON.stringify($scope.allGroup));
                console.log(data.data.message);
            } else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
        console.log("<--getAllEmployee");
    }

    if (userData.chatRights == 'yes') {
        $scope.getChatGroupListById(localStorage.getItem("userId"));
    }

    $scope.chatDetails = function (type, index) {

        console.log("chatDetails-->");
        $scope.selectedType = type;
        console.log("  $scope.selectedType: " + $scope.selectedType);
        // console.log(" $scope.allGroup[index]: " + JSON.stringify($scope.allGroup[index]));
        // $scope.groupData = $scope.allGroup[index];
        //$scope.selectedType = "individual_chats";
        console.log(" $scope.allChatRecords[index]: " + JSON.stringify($scope.allChatRecords[index]));
        $scope.allChat = $scope.allChatRecords[index];
        $scope.individualData = $scope.allChatRecords[index];

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
            } else {
                console.log("Sorry: " + data.data.message);
            }
        })
    }

    $scope.getEmpDetail = function (index) {
        console.log("getEmpDetail-->");
        $scope.selectedType = "individual_chats";
        console.log(" $scope.selectedType : " + $scope.selectedType);
        $scope.individualData = $scope.allEmp[index];
        console.log(" $scope.individualData: " + JSON.stringify($scope.individualData));
        $scope.readText();
    }

    $scope.sendText = function () {
        $('#comment').val('');
        console.log("sendText-->");
        console.log("$scope.typedMessage: " + $scope.typedMessage);
        var api;
        var obj;
        console.log("$scope.selectedType: " + $scope.selectedType);
        if ($scope.selectedType == 'individual_chats') {
            api = "https://norecruits.com/careator_individualText/individualText";
            obj = {
                "senderId": userData.userId,
                "receiverId": $scope.individualData._id,
                "senderName": userData.userName,
                "receiverName": $scope.individualData.name,
                "message": $scope.typedMessage
            }
        } else if ($scope.selectedType == 'group') {
            api = "https://norecruits.com/careator_groupText/groupText";
        }
        console.log("api: " + api);
        careatorHttpFactory.post(api, obj).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            if (checkStatus) {
                console.log("data.data.data: " + JSON.stringify(data.data.data));
                console.log(data.data.message);
                $scope.allChat.chats.push({
                    "senderId": obj.senderId,
                    "senderName": obj.senderName,
                    "message": obj.message,
                    "sendTime": new Date()
                });
            } else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
    }

    $scope.readText = function () {
        console.log("readText-->");
        var sId = userData.userId;
        var rId = $scope.individualData._id;
        var api = "https://norecruits.com/careator_individualTextRead/individualTextReadById/" + sId + "/" + rId;
        console.log("api: " + api);
        careatorHttpFactory.get(api).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            if (checkStatus) {
                $scope.allChat = data.data.data[0];
                console.log("allChat: " + JSON.stringify($scope.allChat));
                console.log(data.data.message);
            } else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
    }

    $scope.getChatRecords = function () {
        console.log("getChatRecords-->");
        var id = $scope.userId;
        var api = "https://norecruits.com/careator_getChatListRecordById/getChatListRecordById/" + id;
        console.log("api: " + api);
        careatorHttpFactory.get(api).then(function (data) {
            // console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            if (checkStatus) {
                $scope.allChatRecords = data.data.data;
                console.log("allChatRecords: " + JSON.stringify($scope.allChatRecords));
                console.log(data.data.message);
                $scope.chatedGroup_records = $scope.allChatRecords; /* ### Note: $scope.chatedGroup_records is Chat(chated records) and group(group records) records storage  ### */
                for (var x = 0; x < $scope.allGroup.length; x++) {
                    $scope.chatedGroup_records.push($scope.allGroup[x]);
                }

            } else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
    }
    $scope.getChatRecords();

    /* ### Start: receive message from careator.js  ### */ //update to client with new message;
    socket.on('comm_textReceived', function (data) {
        console.log("****comm_textReceived-->: " + JSON.stringify(data));;

        if ($scope.allChat._id == data.id) {
            console.log("start pushing message");
            $scope.allChat.chats.push({
                "senderId": data.senderId,
                "senderName": data.senderName,
                "message": data.message,
                "sendTime": data.sendTime
            });
            scrollDown();
        }

    })
    /* ### End: Get event update from index.js  ### */

    /* ### Start: Front end  CSS### */
    $(".heading-compose").click(function () {
        $(".side-two").css({
            "left": "0"
        });
        console.log("heading-compose");
    });

    $(".newMessage-back").click(function () {
        $(".side-two").css({
            "left": "-100%"
        });
        console.log("newMessage-back");
    });
    // /* ### End: Front end CSS ### */
    $("#comment").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#sndmgs").click();
        }
    });


    /////Auto Scroll Down Chat////////////////
    $scope.scrollDown = function () {
        $("#conversation").animate({
            scrollTop: $("#conversation").prop("scrollHeight")
        }, 500);
    }

    


})