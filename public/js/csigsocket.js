// var encUrl = localStorage.getItem("encUrl");
// var encPswd = localStorage.getItem("encPswd");
// var decryptedUrl = CryptoJS.AES.decrypt(encUrl, "url");
// var decryptedPswd = CryptoJS.AES.decrypt(encPswd, "pswd");
// console.log("decryptedUrl: "+decryptedUrl.toString(CryptoJS.enc.Utf8));
// console.log("decryptedPswd: "+decryptedPswd.toString(CryptoJS.enc.Utf8));

// ];
var sesionEnc = localStorage.getItem("sessionEnc");
console.log("sesionEnc: " + sesionEnc);


/** CONFIG **/
console.log("Signaling Socket.js");
var SIGNALING_SERVER = "https://norecruits.com";
//var SIGNALING_SERVER = "http://localhost:5000";
var streamArray = [];
var signaling_socket = null; /* our socket.io connection to our webserver */
var local_media_stream = null; /* our own microphone / webcam */
var local_media_shareStream = null;
var peers = {}; /* keep track of our peer connections, indexed by peer_id (aka socket.io id) */
var peer_media_elements = {};
peer_userName_elements = {};
var peer_media_sselements = {}; /* keep track of our <video>/<audio> tags, indexed by peer_id */
/* #### Logu Defined  ##### */
var peerNew_id = null;
var queryLink = null;
var timeLink = null;
var txtQueryLink = null;

// signaling_socket = io(SIGNALING_SERVER);
var file;
var disconnPeerId = null;
var shareScreen = null;
var sessionHeader = null;
var peerStream = null;

signaling_socket = io(SIGNALING_SERVER);

var userName;
var USE_AUDIO = true;
var USE_VIDEO = true;
var DEFAULT_CHANNEL = "some-global-ch-name";
var MUTE_AUDIO_BY_DEFAULT = false;

var url = window.location.href;
var stuff = url.split("/");
var id1 = stuff[stuff.length - 2];
var id2 = stuff[stuff.length - 3];
console.log("stuff.length: " + stuff.length);
console.log("id1**: " + id1);
console.log("id2**: " + id2);
if (stuff.length > 5) {

  if (localStorage.getItem("careatorEmail")) {

    var userNameEmail = localStorage.getItem("careatorEmail");
    var emailIdSplit = userNameEmail.split('@');
    userName = emailIdSplit[0];
    document.getElementById("videoConferenceUrl").style.display = "block";
    document.getElementById("invitePeople_container").style.display = "block";
  }
  else if (localStorage.getItem("careatorFriendName")) {
    userName = localStorage.getItem("careatorFriendName");
    careatorFriendName = true;
    document.getElementById("videoConferenceUrl").style.display = "none";
    document.getElementById("invitePeople_container").style.display = "none";
  }
  else {
    console.log("No user data from session");
    $("#setName").trigger("click");
  }
  console.log("userName: " + userName);
}
else {

  if (localStorage.getItem("careatorEmail")) {
    console.log("2 cond");
    var userNameEmail = localStorage.getItem("careatorEmail");
    console.log("2 cond: userNameEmail: " + userNameEmail);
    var emailIdSplit = userNameEmail.split('@');
    console.log("2 cond: emailIdSplit: " + JSON.stringify(emailIdSplit));
    userName = emailIdSplit[0];
    document.getElementById("videoConferenceUrl").style.display = "block";
    document.getElementById("videoConferenceLinkExtention").style.display = "block";
  }
  else {
    console.log("enterEmail: -->");
    $("#enterEmail").trigger("click");
  }
  console.log("userName: " + userName);
}

function triggerInvite() {
  console.log("triggerInvite-->");
  $("#enterPswd").trigger("click");

}
function sendEmail() {
  console.log("sendEmail-->");
  var careatorEmail = document.getElementById("careatorEmail").value;
  console.log("careatorEmail: " + careatorEmail);
  var obj = {
    "careatorEmail": careatorEmail
  };
  console.log("obj: " + JSON.stringify(obj));
if(careatorEmail.trim()==''){
  console.log("find empty");
}
else{
  // $.ajax({
  //   url: "https://norecruits.com/careator/pswdGenerate",
  //   type: "POST",
  //   data: JSON.stringify(obj),
  //   contentType: "application/json",
  //   dataType: "json",
  //   success: function (data) {
  //     console.log("data: " + JSON.stringify(data));
  //       if (data.message == 'Successfully mail sent') {
  //       console.log("Successfully mail sent");
  //       localStorage.setItem("careatorEmail", careatorEmail);
  //       $('#myEmailModal').modal('hide');
  //       //triggerInvite();
  //     }
  //   },
  //   error: function (err) {
  //     console.log("err: " + JSON.stringify(err));
  //     console.log("err.responseText: " + JSON.stringify(err.responseText));
  //     console.log("err.responseJSON: " + JSON.stringify(err.responseJSON.message));
  //     alert(err.responseJSON.message);
  //   }
  // });
}

  console.log("<--sendEmail");
}
