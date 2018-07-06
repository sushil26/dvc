careatorApp.controller('chatCtrl', function ($scope, $rootScope, $filter, $window, careatorHttpFactory, careatorSessionAuth) {
    console.log("chatCtrl==>");
    var userData = careatorSessionAuth.getAccess("userData");
    $scope.userId = userData.userId;
    console.log("userData: " + JSON.stringify(userData));
    $scope.allGroupAndIndividual = []; /* ### Note:$scope.allGroupAndIndividual contains All employee list(who having chat rights) and group list(which are included by login person)   ### */
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
        // if (screen.width < 768) {

        //     $('.side-one').css({ "opacity": "0" });
        //     $('.conversation').css({ "position": "absolute", "top": "0", "width": "100%" });

        // }
        $scope.selectedType = type;
        console.log("  $scope.selectedType: " + $scope.selectedType);
        $scope.allChat = $scope.allChatRecords[index];
        $scope.individualData = $scope.allChatRecords[index];
        console.log(" $scope.allChatRecords[index]: " + JSON.stringify($scope.allChatRecords[index]));
        console.log(" $scope.individualData : " + JSON.stringify($scope.individualData));
        if ($scope.selectedType == "individual_chats") {
            $scope.receiverData = {
                "senderId": userData.userId,
                "senderName": userData.userName,
            }
            console.log(" Before  $scope.receiverData : " + JSON.stringify($scope.receiverData));
            if ($scope.individualData.receiverId != userData.userId) {
                $scope.receiverData.receiverId = $scope.individualData.receiverId;
                $scope.receiverData.receiverName = $scope.individualData.receiverName;
            }
            else if ($scope.individualData.senderId != userData.userId) {
                $scope.receiverData.receiverId = $scope.individualData.senderId;
                $scope.receiverData.receiverName = $scope.individualData.senderName;
            }
        }
        else if ($scope.selectedType == 'group') {
            $scope.sendGroupText_withData = {
                "group_id": $scope.individualData._id,
                "groupName": $scope.individualData.groupName,
                "senderId": userData.userId,
                "senderName": userData.userName
            }
            console.log("sendGroupText_withData-->: " + JSON.stringify($scope.sendGroupText_withData));
            $scope.readText();
        }
        console.log("   $scope.receiverData : " + JSON.stringify($scope.receiverData));
        console.log("sendGroupText_withData-->: " + JSON.stringify($scope.sendGroupText_withData));
    }

    $scope.chatDetailsFromNew = function (type, index) {
        console.log("chatDetailsFromNew-->");
         $("#backkjkj").click();
        $scope.selectedType = type;
        console.log("  $scope.selectedType: " + $scope.selectedType);
        console.log(" $scope.allGroupAndIndividual[index]: " + JSON.stringify($scope.allGroupAndIndividual[index]));
        $scope.allChat = $scope.allGroupAndIndividual[index];
        $scope.individualData = $scope.allGroupAndIndividual[index];
        console.log(" $scope.individualData : " + JSON.stringify($scope.individualData));
        if ($scope.selectedType == "individual_chats") {
            $scope.receiverData = {
                "senderId": userData.userId,
                "senderName": userData.userName,
                "receiverId": $scope.individualData._id,
                "receiverName": $scope.individualData.name
            }
        }
        else if ($scope.selectedType == 'group') {
            $scope.sendGroupText_withData = {
                "group_id": $scope.individualData._id,
                "groupName": $scope.individualData.groupName,
                "senderId": userData.userId,
                "senderName": userData.userName
            }
            console.log("sendGroupText_withData-->: " + JSON.stringify($scope.sendGroupText_withData));
        }
        console.log("   $scope.receiverData : " + JSON.stringify($scope.receiverData));
        $scope.readText();
    }

    $scope.getAllChatRightEmp = function () {
        console.log("getAllChatRightEmp-->");
        $scope.allGroupAndIndividual = [];
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
                for (var x = 0; x < $scope.allEmp.length; x++) {
                    $scope.allGroupAndIndividual.push($scope.allEmp[x]);
                }
                for (var x = 0; x < $scope.allGroup.length; x++) {
                    $scope.allGroupAndIndividual.push($scope.allGroup[x]);
                }
                console.log(" $scope.allGroupAndIndividual: " + JSON.stringify($scope.allGroupAndIndividual));
            } else {
                console.log("Sorry: " + data.data.message);
            }
        })
    }
    // $scope.getAllChatRightEmp();
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
                "receiverId": $scope.receiverData.receiverId,
                "senderName": userData.userName,
                "receiverName": $scope.receiverData.receiverName,
                "message": $scope.typedMessage
            }
            console.log("obj: " + JSON.stringify(obj));
        } else if ($scope.selectedType == 'group') {
            obj = {
                "group_id": $scope.sendGroupText_withData.group_id,
                "groupName": $scope.sendGroupText_withData.groupName,
                "senderId": userData.userId,
                "senderName": userData.userName,
                "message": $scope.typedMessage
            }
            console.log("obj: " + JSON.stringify(obj));
            api = "https://norecruits.com//careator_groupText/groupText";
        }
        console.log("api: " + api);
        careatorHttpFactory.post(api, obj).then(function (data) {
            console.log("data--" + JSON.stringify(data.data));
            var checkStatus = careatorHttpFactory.dataValidation(data);
            if (checkStatus) {
                console.log("data.data.data: " + JSON.stringify(data.data.data));
                console.log(data.data.message);
                // $scope.allChat.chats.push({
                //     "senderId": obj.senderId,
                //     "senderName": obj.senderName,
                //     "message": obj.message,
                //     "sendTime": new Date()
                // });
                // $scope.scrollDown();
                console.log("=====scrollDown=====");

            } else {
                console.log("Sorry");
                console.log(data.data.message);
            }
        })
    }

    $scope.readText = function () {
        console.log("readText-->");
        if ($scope.selectedType == 'group') {
            var group_id = $scope.individualData._id;
            var api = "https://norecruits.com/careator_groupTextRead/groupTextReadByGroupId/" + group_id;
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
        else {
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
        console.log("$scope.individualData._id: " + $scope.individualData._id);
        console.log(" data.id: " + data.id);
        if ($scope.selectedType == 'group') {
            if ($scope.allChat._id == data.id) {
                console.log("start pushing message");
                $scope.allChat.chats.push({
                    "senderId": data.senderId,
                    "senderName": data.senderName,
                    "message": data.message,
                    "sendTime": data.sendTime
                });
                $scope.scrollDown();
            }
        }


        if ($scope.individualData._id == data.id) {
            console.log("start pushing message");
            $scope.allChat.chats.push({
                "senderId": data.senderId,
                "senderName": data.senderName,
                "message": data.message,
                "sendTime": data.sendTime
            });
            $scope.scrollDown();
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
        console.log("scrollDown-->");
        $("#pulldown").animate({
            scrollTop: $("#pulldown").prop("scrollHeight")
        }, 500);
    }




})