app.controller('historyController', function ($scope, $rootScope, $window, httpFactory, sessionAuthFactory, $uibModal) {
    console.log("historyController==>");
    $scope.events = [];
    $scope.userData = sessionAuthFactory.getAccess("userData");
    $scope.propertyJson = $rootScope.propertyJson;
    // $scope.today = new Date();
    $scope.getToDate = function () {
        console.log("Get To Date-->");
        var api = $scope.propertyJson.VC_getToDate;
        httpFactory.get(api).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                console.log("data.data.data.date: " + data.data.data.date);
                var todayDate = new Date(data.data.data.date);
                console.log("todayDate: " + todayDate);
                var reqDate = todayDate.getDate();
                console.log("reqDate: " + reqDate);
                var reqMonth = todayDate.getMonth();
                var reqYear = todayDate.getFullYear();
                var reqHr = todayDate.getHours();
                var reqMin = todayDate.getMinutes();
                var reqSec = todayDate.getSeconds();
                $scope.todayDate = new Date(reqYear, reqMonth, reqDate, reqHr, reqMin, reqSec);
                console.log("todayDate: " + $scope.todayDate);
                $scope.eventGet();
            }
            else {
            }
        })
        console.log("<--Get To Date");
    }
    $scope.getToDate();
    $scope.eventGet = function () {
        console.log("eventGet-->");
        var id = $scope.userData.id;
        var api = $scope.propertyJson.VC_eventGet + "/" + id;
        //var api = "http://localhost:5000/vc/eventGet"+ "/" + id;;
        $scope.calendarOwner = "Your";
        httpFactory.get(api).then(function (data) {
            var checkStatus = httpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.eventData = data.data.data;
                // ownerEvents = [];
                for (var x = 0; x < $scope.eventData.length; x++) {
                    console.log("$scope.eventData[" + x + "]: " + JSON.stringify($scope.eventData[x]));
                    var obj = {
                        'id': $scope.eventData[x]._id,
                        'title': $scope.eventData[x].title,
                        'color': $scope.eventData[x].primColor,
                        'startsAt': new Date($scope.eventData[x].start),
                        'endsAt': new Date($scope.eventData[x].end),
                        'draggable': true,
                        'resizable': true,
                        'url': $scope.eventData[x].url,
                        "senderName": $scope.eventData[x].senderName,
                        "senderId": $scope.eventData[x].senderId,
                        "senderMN": $scope.eventData[x].senderMN,
                        "senderLoginType": $scope.eventData[x].senderLoginType,
                        "title": $scope.eventData[x].title,
                        "reason": $scope.eventData[x].reason,
                        "receiverEmail": $scope.eventData[x].receiverEmail,
                        "receiverName": $scope.eventData[x].receiverName,
                        "receiverId": $scope.eventData[x].receiverId,
                        "receiverMN": $scope.eventData[x].receiverMN,
                        "remoteCalendarId": $scope.eventData[x].remoteCalendarId
                    }
                    if($scope.eventData[x].vcRecordId){
                        obj.vcRecordId = $scope.eventData[x].vcRecordId;
                    }
                    console.log(" obj" + JSON.stringify(obj))
                    $scope.events.push(obj);
                }
            }
            else {
                //alert("Event get Failed");
            }
        })
    }
    // $scope.eventGet();
    $scope.viewDetail = function (id) {
        console.log("viewDetail-->");
        console.log("id: " + id);
        var eClicked = $uibModal.open({
            scope: $scope,
            templateUrl: '/html/templates/eventDetails.html',
            windowClass: 'show',
            backdropClass: 'show',
            controller: function ($scope, $uibModalInstance) {
                $scope.eventDetails = $scope.events[id];
                console.log("$scope.eventDetails: "+JSON.stringify($scope.eventDetails));
                var id = '$scope.events[id].vcRecordId';
               
                var api = 'record/getRecordVideo/' + id;
                console.log("api: " + api);
                httpFactory.get(api).then(function (data) {
                    var checkStatus = httpFactory.dataValidation(data);
                    console.log("data--" + JSON.stringify(data.data));
                    $scope.videoSrc = JSON.stringify(data.data.data);
                    var video = document.getElementById('videoPlayer');
                    video.src = 'data:video/webm;base64,' + data.data.data;
                    if (checkStatus) {
                    }
                    else {
                    }
                    console.log("$scope.eventDetails: " + JSON.stringify($scope.eventDetails));
                })
            }
        })
        console.log("<--viewDetail");
    }

    //update the client with new data;
    socket.on('eventUpdatedForHistory', function (data) {
        console.log("data: " + JSON.stringify(data));
        $scope.eventGet();
    });
})