careatorApp.controller('careator_historyCtr', function ($scope, $rootScope, $state, $window, careatorHttpFactory, careatorSessionAuth, $uibModal) {
    console.log("careator_historyCtr==>");
    $scope.events = [];
    $scope.userData = careatorSessionAuth.getAccess("userData");
    $scope.propertyJson = $rootScope.propertyJson;
    // $scope.today = new Date();
    $scope.getToDate = function () {
        console.log("Get To Date-->");
        var api = "https://norecruits.com/careator_getToDate/careator_getToDate";
        careatorHttpFactory.get(api).then(function (data) {
            var checkStatus = careatorHttpFactory.dataValidation(data);
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
                console.log("consolidateDate: " + $scope.consolidateDate);
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
        var api = "https://norecruits.com/careator_eventSchedule/careator_eventGetById/" + id;
        console.log("api: "+api);
        //var api = "http://localhost:5000/vc/eventGet"+ "/" + id;;
        $scope.calendarOwner = "Your";
        careatorHttpFactory.get(api).then(function (data) {
            var checkStatus = careatorHttpFactory.dataValidation(data);
            console.log("data--" + JSON.stringify(data.data));
            if (checkStatus) {
                $scope.eventData = data.data.data;
                // ownerEvents = [];
                for (var x = 0; x < $scope.eventData.length; x++) {
                    console.log("$scope.eventData[" + x + "]: " + JSON.stringify($scope.eventData[x]));
                    var obj = {
                        'id': $scope.eventData[x]._id,
                        "senderId": $scope.eventData[x].senderId,
                        "senderName": $scope.eventData[x].senderName,
                        "senderEmail": $scope.eventData[x].senderEmail,
                        "title": $scope.eventData[x].title,
                        "reason": $scope.eventData[x].reason,
                        "invitingTo": $scope.eventData[x].invitingTo,
                        "formatedStartTime": $scope.eventData[x].formatedStartTime,
                        "formatedEndTime": $scope.eventData[x].formatedEndTime,
                        "startsAt": new Date($scope.eventData[x].startsAt),
                        "endsAt": new Date($scope.eventData[x].endsAt),
                        "primColor": $scope.eventData[x].primColor,
                        "url": $scope.eventData[x].url,
                        "date": $scope.eventData[x].date,
                       
                    }
                    console.log(" obj" + JSON.stringify(obj));
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
        console.log("id: "+id);
        $state.go('dashboard.viewEvent', { 'id': id});
        // console.log("id: " + id);
        // var indexId = id;
        // var id = $scope.events[indexId].vcRecordId;
        // var api = $scope.propertyJson.VC_getRecordVideo + "/" + id;
        // console.log("api: " + api);
        // careatorHttpFactory.get(api).then(function (data) {
        //     var checkStatus = careatorHttpFactory.dataValidation(data);
        //     console.log("data--" + JSON.stringify(data.data));
        //     if (checkStatus) {
        //         console.log("status true");
        //         $scope.videoSrc = data.data.data;
        //         //console.log(" $scope.videoSrc: "+ $scope.videoSrc);
        //     }
        //     else {
        //         console.log("Sorry: status false");
        //         console.log("data: "+JSON.stringify(data));
        //     }
        //     // console.log("$scope.eventDetails: " + JSON.stringify($scope.eventDetails));
        // })
        // var eClicked = $uibModal.open({
        //     scope: $scope,
        //     templateUrl: '/html/templates/eventDetails.html',
        //     windowClass: 'show',
        //     backdropClass: 'show',
        //     controller: function ($scope, $uibModalInstance) {
        //         $scope.eventDetails = $scope.events[indexId];
        //         // var video = document.getElementById('videoPlayer');
        //         $scope.videoSrc = 'data:video/webm;base64,' + $scope.videoSrc;
        //         console.log("$scope.videoSrc: " + $scope.videoSrc);
        //         // $scope.videoSrc =  $scope.videoSrc;
        //         //console.log("$scope.events["+indexId+"]: "+JSON.stringify($scope.events[indexId]));

        //     }
        // })
        console.log("<--viewDetail");
    }

    //update the client with new data;
    socket.on('eventUpdatedForHistory', function (data) {
        console.log("data: " + JSON.stringify(data));
        $scope.eventGet();
    });
})