var express = require('express');
var http = require('http');
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');
var fs = require('fs'),
    url = require('url'),
    path = require('path');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    limit: '100mb'
}));

module.exports = function (app, config) {
    //app.set('view engine','html');


    // app.use(session({secret: "Your secret key"}));
    //app.use(multer({ dest: './config'}));


}



var queryId = null;
var userName = null;
var time = null;

// var mongoConfig = require('./config/dbConfig.js');

// mongoConfig.connectToServer(function(err) {
//     var server = app.listen("8080");
//     var io = require('socket.io').listen(server);
//     server.timeout = 9999999999;
//     console.log("Listening on port 8080");
//     // require('./config/express')(app, config);
//     require('./config/express')(app);
//     // require('./config/server_socket')(io);
//     require('./config/server_socket')(io);

//     require('./config/router')(app);
// });

var mongoConfig = require('./config/dbConfig.js');
//app.set('port', (process.env.PORT || 5000));
// main.listen(main.get('port'), function() {
//     console.log('Node app is running on port', main.get('port'));
//   });
var server = app.listen('5000', function () {
    console.log("Listening on port 5000");
});

// var server = app.listen("8080");

var io = require('socket.io').listen(server);

// server.timeout = 9999999999;
mongoConfig.connectToServer(function (err) {

    require('./config/router')(app);

})
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/public/bower_components'));
// app.use(express.static(__dirname + '/node_modules'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// require('./config/server_socket')(io);

app.get("/client", function (req, res) {

    queryId = null;

    console.log("start to render page");
    res.sendFile(__dirname + '/public/client.html');
});

app.get("/client/:id/:time", function (req, res) {
    queryId = req.params.id;
    time = req.params.id;
    console.log("queryId: " + req.params.id);
    console.log("start to render page");
    res.sendFile(__dirname + '/public/client.html');
});

app.get("/mainPage", function (req, res) {
    console.log("start to render page");
    res.sendFile(__dirname + '/public/html/mainPage.html');
});



/*************************/
/*** INTERESTING STUFF ***/
/*************************/

var channels = {};
var sockets = {};
var peerTrack = [];
var peerWithQueryId = []; /* PeerId with Query Id: peer-id is a index, value is a query id  */
var peerWithTimeId = [];  /* PeerId with time Id: peer-id is a index, value is a time id  */
var peerWithUserName = []; /* PeerId with UserName: peer-id is a index, Value is a UserName  */
var peerTrackForVideo = { 'link': [] }; /* This variable for getting socket.id's with perticular Link*/
var tempId = null;
var sessionHeaderId = null;
/**
 * Users will connect to the signaling server, after which they'll issue a "join"
 * to join a particular channel. The signaling server keeps track of all sockets
 * who are in a channel, and on join will send out 'addPeer' events to each pair
 * of users in a channel. When clients receive the 'addPeer' even they'll begin
 * setting up an RTCPeerConnection with one another. During this process they'll
 * need to relay ICECandidate information to one another, as well as SessionDescription
 * information. After all of that happens, they'll finally be able to complete
 * the peer connection and will be streaming audio/video between eachother.
 */




