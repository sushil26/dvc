careatorApp.controller('usersListCtrl', function ($scope, $state, careatorHttpFactory, SweetAlert) {
    console.log("usersListCtrl==>");

    var vm = this;
    vm.alert = function () {
        //alert implementation here
        SweetAlert.swal("I'm a fancy Alert");
    }
    vm.confirm = function () {
        SweetAlert.swal({
                title: "Are you sure?", //Bold text
                text: "Your will not be able to recover this imaginary file!", //light text
                type: "warning", //type -- adds appropiriate icon
                showCancelButton: true, // displays cancel btton
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false, //do not close popup after click on confirm, usefull when you want to display a subsequent popup
                closeOnCancel: false
            },
            function (isConfirm) { //Function that triggers on user action.
                if (isConfirm) {
                    SweetAlert.swal("Deleted!");
                } else {
                    SweetAlert.swal("Your file is safe!");
                }
            }

        )
    }




    $scope.getAllEmployee = function () {
        console.log("getAllEmployee-->");
        var api = "https://norecruits.com/careator/careator_getAllEmp";
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

    $scope.getAllEmployee();

    $scope.statusChange = function (id, status, index) {

        SweetAlert.swal({
                title: "Are you sure to Activate/Deactivate the user??", //Bold text
                text: "User will not be able to Login if deactivate!", //light text
                type: "warning", //type -- adds appropiriate icon
                showCancelButton: true, // displays cancel btton
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Change it!",
                closeOnConfirm: false, //do not close popup after click on confirm, usefull when you want to display a subsequent popup
                closeOnCancel: false
            },
            function (isConfirm) { //Function that triggers on user action.
                if (isConfirm) {
                    SweetAlert.swal("Changed!");
                    console.log("statusChange-->");
                    console.log("id: " + id + " status: " + status + " index: " + index);
                    var obj = {
                        "id": id,
                        "status": status
                    }
                    var api = "https://norecruits.com/careator/statusChangeById";
                    console.log("api: " + api);
                    careatorHttpFactory.post(api, obj).then(function (data) {
                        console.log("data--" + JSON.stringify(data.data));
                        var checkStatus = careatorHttpFactory.dataValidation(data);
                        console.log("data--" + JSON.stringify(data.data));
                        if (checkStatus) {
                            $scope.allemployee[index].status = status
                            console.log(data.data.message);
                        } else {
                            console.log("Sorry");
                            console.log(data.data.message);
                        }
                    })
                    console.log("<--statusChange");


                } else {
                    SweetAlert.swal("Your user is safe!");
                }
            }
        )

    }

    $scope.editUser = function (index) {
        console.log("editUser-->");
        console.log("$scope.allemployee[index]: " + JSON.stringify($scope.allemployee[index]));
        var data = $scope.allemployee[index];
        $state.go("Cdashboard.editUser", {
            "id": data._id
        });
    }
    $scope.seeChat = function (id) {
        console.log("seeChat-->");
        $state.go('Cdashboard.chatHistory', {
            "id": id
        })
    }


    ////////////////Delete User/////////////////////////

    $scope.deleteUser = function (id) {
        SweetAlert.swal({
                title: "Are you sure you want to delete the user??", //Bold text
                text: "Your will not be able to recover this user!", //light text
                type: "warning", //type -- adds appropiriate icon
                showCancelButton: true, // displays cancel btton
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false, //do not close popup after click on confirm, usefull when you want to display a subsequent popup
                closeOnCancel: false
            },
            function (isConfirm) { //Function that triggers on user action.
                if (isConfirm) {
                    SweetAlert.swal("Deleted!");
                    var api = "https://norecruits.com/careator_userDelete/userDeleteById/" + id;
                    careatorHttpFactory.get(api).then(function (data) {
                        console.log("data--" + JSON.stringify(data.data));
                        var checkStatus = careatorHttpFactory.dataValidation(data);
                        console.log("data--" + JSON.stringify(data.data));
                        if (checkStatus) {
                            console.log(data.data.message);
                            $scope.getAllEmployee();
                        } else {
                            console.log("Sorry");
                            console.log(data.data.message);
                        }
                    })
                    console.log("<--statusChange");

                } else {
                    SweetAlert.swal("Your user is safe!");
                }
            }

        )




        console.log("deleteUser-->");
        console.log("Obj ID  " + id);

    }

    $scope.resetLoginFlag = function (id) {
        $("#ResetConfirmationButton").trigger("click");
        console.log("deleteUser-->");
        console.log("Obj ID  " + id);
        $scope.userReset = function () {
            console.log("userReset-->");
            var api = "https://norecruits.com/careator_reset/resetLoginFlagsById/" + id;
            careatorHttpFactory.post(api).then(function (data) {
                console.log("data--" + JSON.stringify(data.data));
                var checkStatus = careatorHttpFactory.dataValidation(data);
                console.log("data--" + JSON.stringify(data.data));
                if (checkStatus) {
                    console.log(data.data.message);
                    $scope.getAllEmployee();
                } else {
                    console.log("Sorry");
                    console.log(data.data.message);
                }
            })
            console.log("<--statusChange");
        }
    }

    /////////serch///////////////////
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
})