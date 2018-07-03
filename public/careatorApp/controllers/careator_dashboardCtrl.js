careatorApp.controller('careator_dashboardCtrl', function ($scope, $rootScope, $filter, careatorSessionnAuth) {
    console.log("careator_dashboardCtrl==>");
    var userData = {
        "email": localStorage.getItem("careatorEmail"),
        "userName"
    }
    if(localStorage.getItem("videoRights")=='yes'){
        careatorSessionnAuth.setAccess(userData);
    }
    if(localStorage.getItem("chatRights")=='yes'){

    }

})