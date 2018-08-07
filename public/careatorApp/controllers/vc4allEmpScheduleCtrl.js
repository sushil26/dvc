careatorApp.controller('vc4allEmpScheduleCtrl', function ($scope, $q, $timeout, $rootScope, $state, $rootScope, $compile, $window, $filter, careatorHttpFactory, careatorSessionAuth, moment, calendarConfig, $uibModal) {
  console.log("vc4allEmpScheduleCtrl==>");
  var dayEventmodal; /* ### Note: open model for event send ###  */
  var studEvents = []; /* ### Note: selected student events ### */
  var teacherEvents = []; /* ### Note: selected teacher events ### */
  var ownerEvents = []; /* ### Note: logged in person all events ### */
  var remoteEvent = []; /* ### Note:receiver all events ### */

  $scope.userData = careatorSessionAuth.getAccess();

  $scope.propertyJson = $rootScope.propertyJson;

  $scope.save = function (title, emailList, sd, ed, reason) {
    console.log("title: " + title);
    console.log("emailList: " + emailList);
    console.log("sd: " + sd);
    console.log("ed: " + ed);
    console.log("reason: " + reason);
    var formatedStartTime = $filter('date')(sd, "HH:mm:ss 'GMT'Z (IST)'");
    var formatedEndTime = $filter('date')(ed, "HH:mm:ss 'GMT'Z (IST)'");
    var dateForEvent = $filter('date')(sd, "EEE MMM dd y");
    dayEventmodal.close('resetModel');
    $scope.eventSend(title, emailList, dateForEvent, formatedStartTime, formatedEndTime, sd, ed, reason);
  }

  function getSocketUrlFromServer() {
    console.log("getSocketUrlFromServer-->");
    var dfd = $q.defer();
    var SIGNALING_SERVER = "https://norecruits.com";
    signaling_socket = io(SIGNALING_SERVER);
    signaling_socket.on('connect', function () {
      console.log("signaling_socket connect-->");

      signaling_socket.on('message', function (config) {
        console.log("signaling_socket message-->");

        queryLink = config.queryId;
        peerNew_id = config.peer_id;

        var url = "https://norecruits.com/client/" + peerNew_id + "/" + $scope.urlDate;
        dfd.resolve(url);
      })
    })
    return dfd.promise;
  }

  $scope.eventSend = function (title, emailList, dateForEvent, formatedStartTime, formatedEndTime, sd, ed, reason) {
    console.log("eventSend-->");

    //var SIGNALING_SERVER = "http://localhost:5000";
    var queryLink = null;
    var peerNew_id = null;
    var url;
    $timeout(function () {
      getSocketUrlFromServer().then(function (url) {
        console.log("Back to function call-->");
        console.log("url: " + url);
        var api = "https://norecruits.com/careator/careator_sendEventSchedule";
        console.log("api: " + api);
        var obj = {
          "studUserId": $scope.userData.userId,
          "senderName": $scope.userData.userName,
          "senderEmail": $scope.userData.email,
          "title": title,
          "reason": reason,
          "InvitingTo": emailList,
          "formatedStartTime": formatedStartTime,
          "formatedEndTime": formatedEndTime,
          "startsAt": sd,
          "endsAt": ed,
          "primColor": "red",
          "url": url,
          "date": dateForEvent,
        }
        console.log("obj: " + JSON.stringify(obj));
        careatorHttpFactory.post(api, obj).then(function (data) {
          var checkStatus = careatorHttpFactory.dataValidation(data);
          //console.log("data--" + JSON.stringify(data.data));
          if (checkStatus) {
            // console.log("data" + JSON.stringify(data.data))
            // $window.location.href = $scope.propertyJson.R082;

            alert("Successfully sent the event");
            // vm.events.splice(0, 1);
            var eventPostedData = data.data.data;
            var objData = {
              'id': obj.userId,
              'title': obj.title,
              'color': obj.primColor,
              'startsAt': $filter('date')($scope.startFiltered, "h:mm a"),
              'endsAt': $filter('date')($scope.endFiltered, "h:mm a"),
              'draggable': true,
              'resizable': true,
              'actions': actions,
              'url': obj.url,
              "reason": res,
              "senderName": name,
              "senderId": id,
              "senderMN": senderMN,
              "receiverEmail": email,
              "receiverName": receiverName,
              "receiverId": receiverId,
              "receiverMN": receiverMN,
            }
            ownerEvents.push(objData);
            vm.events.push(objData);
          }
          else {
            alert("Event Send Failed");

          }
        })
      });
    }, 0);


    console.log("<--eventSend");
    // var url = document.getElementById('linkToShare').innerHTML;
  }


  var vm = this;
  //These variables MUST be set as a minimum for the calendar to work
  // vm.calendarView = 'month';
  // vm.viewDate = new Date();
  vm.calendarView = 'month';
  vm.viewDate = moment().startOf('day').toDate();
  var originalFormat = calendarConfig.dateFormats.hour;
  calendarConfig.dateFormats.hour = 'HH:mm';
  if ($scope.userData.loginType == 'teacher') {
    var actions = [{
      // label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      label: 'Re-Schedule',
      onClick: function (args) {
        // alert("Edit Event Comming Soon");
        console.log("args.calendarEvent: " + args.calendarEvent);
        console.log("JSON args.calendarEvent: " + JSON.stringify(args.calendarEvent));
        var date = args.calendarEvent.startsAt;
        var reqDate = date.getDate() - 1;
        var reqMonth = date.getMonth();
        var reqYear = date.getFullYear();
        var reqHr = date.getHours();
        var reqMin = date.getMinutes();
        var reqSec = date.getSeconds();
        var consolidateDate = new Date(reqYear, reqMonth, reqDate, reqHr, reqMin, reqSec);
        console.log("args.calendarEvent.id: " + args.calendarEvent.id);
        console.log("args.calendarEvent: " + JSON.stringify(args.calendarEvent));
        if (consolidateDate > $scope.todayDate) {
          // alert("Edit Started-->");
          var id = args.calendarEvent.id;
          //   var cs= $scope.events[id].student_cs;

          //   var stud_id = $scope.events[id].student_id; 
          //   var name = $scope.events[id].student_Name;

          console.log("id: " + id);
          $state.go('dashboard.eventReschedule', { 'id': id });
        }
        else {
          var loginAlert = $uibModal.open({
            scope: $scope,
            templateUrl: '/html/templates/dashboardwarning.html',
            windowClass: 'show',
            backdropClass: 'static',
            keyboard: false,
            controller: function ($scope, $uibModalInstance) {
              $scope.message = "Sorry you not allow to edit";
            }
          })
          // alert("Sorry you not allow to edit");
        }
        // var eClicked = $uibModal.open({
        //   scope: $scope,
        //   templateUrl: '/html/templates/eventDetails_edit.html',
        //   windowClass: 'show',
        //   backdropClass: 'show',
        //   controller: function ($scope, $uibModalInstance) {
        //     $scope.eventDetails = args.calendarEvent;
        //     console.log("$scope.eventDetails: " + $scope.eventDetails);
        //   }
        // })

      }
    }
      // {

      //   label: 'Delete',
      //   onClick: function (args) {
      //     alert("Delete Event Comming Soon");
      //     console.log("args: " + args);

      //   }
      // }
    ];
  }

  vm.events = [
    // {
    //   title: 'An event',
    //   color: calendarConfig.colorTypes.warning,
    //   startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate('2018-03-21T05:30:00.000Z'),
    //   endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
    //   draggable: true,
    //   resizable: true,
    //   actions: actions
    // }

  ];

  vm.cellIsOpen = true;

  vm.addEvent = function () {
    console.log("addEvent-->");
    vm.events.splice(0, 0, {
      title: 'New event',
      startsAt: moment().startOf('day').toDate(),
      endsAt: moment().endOf('day').toDate(),
      color: calendarConfig.colorTypes.important,
      draggable: true,
      resizable: true
    });
    // vm.events.push({
    //   title: 'New event',
    //   startsAt: moment().startOf('day').toDate(),
    //   endsAt: moment().endOf('day').toDate(),
    //   color: calendarConfig.colorTypes.important,
    //   draggable: true,
    //   resizable: true
    // });
  };

  // $scope.eventDetailClick = function (index) {
  //   console.log("eventDetailClick--> ");
  //   var evtData = vm.events[index];
  //   var eventSenderLoginType = evtData.senderLoginType;
  //   var receiverId = evtData.remoteCalendarId;
  //   console.log("$scope.evtData: " + JSON.stringify($scope.evtData));
  //   console.log("eventSenderLoginType: " + eventSenderLoginType);
  //   console.log("receiverId: "+receiverId);
  //   var eClicked = $uibModal.open({
  //     scope: $scope,
  //     templateUrl: '/html/templates/eventDetails.html',
  //     windowClass: 'show',
  //     backdropClass: 'show',
  //     controller: function ($scope, $uibModalInstance) {
  //       $scope.eventDetails = evtData;
  //       console.log("$scope.eventDetails: " + $scope.eventDetails);
  //     }
  //   })
  //   console.log("<--eventDetailClick");
  // }
  vm.eventClicked = function (event) {
    console.log("eventClicked-->");
    // alert("clicked: " + event);
    console.log("cliecked: " + JSON.stringify(event));
    $scope.evtData = event;
    console.log("$scope.evtData: " + JSON.stringify($scope.evtData));
    // $('#eDetail').trigger('click');
    var eClicked = $uibModal.open({
      scope: $scope,
      templateUrl: '/html/templates/eventDetails.html',
      windowClass: 'show',
      backdropClass: 'show',
      controller: function ($scope, $uibModalInstance) {
        $scope.eventDetails = event;
        console.log("$scope.eventDetails: " + JSON.stringify($scope.eventDetails));
      }
    })
    console.log("<--eventClicked");
  };

  $scope.eventClicked = function (event) {
    // alert("clicked: " + event);
    console.log("cliecked: " + event);
    //  alert.show('Clicked', event);
  };

  vm.eventEdited = function (event) {
    // alert("eventEdited");
    console.log("cliecked: " + event);
    // alert.show('Edited', event);
  };

  vm.eventDeleted = function (event) {
    // alert("eventDeleted");
    console.log("deleted");
    // alert.show('Deleted', event);
  };

  vm.eventTimesChanged = function (event) {
    // alert.show('Dropped or resized', event);
  };

  vm.toggle = function ($event, field, event) {
    $event.preventDefault();
    $event.stopPropagation();
    event[field] = !event[field];
  };
  vm.rangeSelected = function (startDate, endDate) {
    var s = startDate;
    var e = endDate;
    console.log("rangeSelected-->");
    console.log("startDate: " + startDate);
    console.log("endDate: " + endDate);
    var PersonalRemoteCombineCal = ownerEvents.concat(vm.events);
    console.log("PersonalRemoteCombineCal: " + JSON.stringify(PersonalRemoteCombineCal));
    var conflicts = PersonalRemoteCombineCal.some(function (event) {
      //   return (event.startsAt <= s && s <= event.endsAt) ||
      //   event.startsAt <= e && e <= event.endsAt ||
      //   s <= event.startsAt && event.startsAt <= e ||
      //   s <= event.endsAt && event.endsAt <= e
      // });
      return (event.startsAt <= s && s < event.endsAt) ||
        event.startsAt < e && e < event.endsAt ||
        s <= event.startsAt && event.startsAt < e ||
        s < event.endsAt && event.endsAt < e
    });
    console.log("conflicts: " + conflicts);
    if (conflicts) {
      console.log("conflicts is there");

      var loginAlert = $uibModal.open({
        scope: $scope,
        templateUrl: '/html/templates/dashboardwarning.html',
        windowClass: 'show',
        backdropClass: 'static',
        keyboard: false,
        controller: function ($scope, $uibModalInstance) {
          $scope.message = "ON this time any one of you not free,try other time";
        }
      })
      // alert("ON this time any one of you not free,try on other time");
    }
    else {
      console.log("No conflicts");
      dayEventmodal = $uibModal.open({
        scope: $scope,
        templateUrl: '/html/templates/dayEventBook.html',
        windowClass: 'show',
        backdropClass: 'show',
        controller: function ($scope, $uibModalInstance) {
          // moment().startOf('day').toDate()
          var dt = new Date();
          $scope.eventDetails = {
            "startsAt": startDate,
            "endsAt": endDate
          }
          console.log("$scope.eventDetails: " + $scope.eventDetails);
        }
      })
    }
    // vm.lastDateClicked = date;
    // alert("date: "+moment(date).startOf('day')+"date*: "+moment().startOf('day'));
    // alert('Edited', args.calendarEvent);
    // console.log("args.calendarEvent: " + args.calendarEvent);
    // console.log("JSON args.calendarEvent: " + JSON.stringify(args.calendarEvent));

    // alert.show('Edited', args.calendarEvent);
    console.log("<--rangeSelected");
  };

  vm.timespanClicked = function (date, css) {
    console.log("timespanClicked-->");
    console.log("date: " + date);
    console.log("teacherPersonalData: " + JSON.stringify($scope.teacherPersonalData));
    $scope.selectedDateForEvent = $filter('date')(date, "EEE");
    console.log("selectedDateForEvent: " + $scope.selectedDateForEvent);

    $scope.selectedDate = date;
    dayEventmodal = $uibModal.open({
      scope: $scope,
      templateUrl: '/careatorApp/common/scheduleTemplate.html',
      windowClass: 'show',
      backdropClass: 'show',
      controller: function ($scope, $uibModalInstance) {
        var dt = new Date();
        $scope.eventDetails = {
          "startsAt": $scope.selectedDate,
          "endsAt": $scope.selectedDate
        }
        console.log("$scope.eventDetails: " + JSON.stringify($scope.eventDetails));
      }
    })
    // if ($scope.remoteCalendarId) {
    //   $('#timeTable_modal').modal('show');
    // }
    // else {
    //   if ($scope.userData.loginType == 'teacher') {
    //     var loginAlert = $uibModal.open({
    //       scope: $scope,
    //       templateUrl: '/html/templates/dashboardwarning.html',
    //       windowClass: 'show',
    //       backdropClass: 'static',
    //       keyboard: false,
    //       controller: function ($scope, $uibModalInstance) {
    //         $scope.message = "Select Student";
    //       }
    //     })
    //     console.log("$scope.eventDetails: " + JSON.stringify($scope.eventDetails));
    //     //alert("Select Student");
    //   }
    //   else {
    //     var loginAlert = $uibModal.open({
    //       scope: $scope,
    //       templateUrl: '/html/templates/dashboardwarning.html',
    //       windowClass: 'show',
    //       backdropClass: 'static',
    //       keyboard: false,
    //       controller: function ($scope, $uibModalInstance) {
    //         $scope.message = "Select Teacher";
    //         console.log("$scope.eventDetails: " + JSON.stringify($scope.eventDetails));
    //       }
    //     })
    //   }

  }



  //   // if (vm.calendarView === 'month') {
  //   //   if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
  //   //     vm.cellIsOpen = false;
  //   //   } else {
  //   //     vm.cellIsOpen = true;
  //   //     vm.viewDate = date;
  //   //   }
  //   // } else if (vm.calendarView === 'year') {
  //   //   if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
  //   //     vm.cellIsOpen = false;
  //   //   } else {
  //   //     vm.cellIsOpen = true;
  //   //     vm.viewDate = date;
  //   //   }
  //   // }
  //   console.log("<--timespanClicked");

  // };






})