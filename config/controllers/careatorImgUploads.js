var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vc');
var conn = mongoose.connection;
var Grid = require('gridfs-stream');
var fs = require('fs');
const path = require('path');
const ABSPATH = path.dirname(process.mainModule.filename); // Absolute path to our app directory
Grid.mongo = mongoose.mongo;

var general = require("../general.js");
const comm_employeeProfilePicDirectory = process.cwd() + '/public/comm_employeeProfilePic/';

module.exports.comm_profileImgUpload = function (req, res) {
    console.log("comm_profileImgUpload--> ");
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    console.log("req.files.sampleFile: " + req.files.logo);
    let myFile = req.files.logo;
    console.log("path--" + comm_employeeProfilePicDirectory);
    var fileArr = myFile.name.split(".");
    var fileName = "";
    for (var i = 0; i < fileArr.length - 1; i++) {
        fileName = fileName + fileArr[i]
    }
    fileName = fileName + "_" + general.date() + "." + fileArr[fileArr.length - 1];
    console.log("fileName--" + fileName)

    myFile.mv(comm_employeeProfilePicDirectory + fileName, function (err) {
        if (err) {
            console.log(require('util').inspect(err));
            var responseData = {
                "status": true,
                "message": "date stored unsuccessfully",
                "data": { "err": err }
            }
            res.status(500).send(responseData);
        }
        else {
            var responseData = {
                "status": true,
                "message": "date stored successfully",
                "data": { "filePath": "/comm_employeeProfilePic/" + fileName }
            }
            res.status(200).send(responseData);
        }
    });

    console.log("uploadProfile Image--> ");
}

module.exports.imageUpload_chat = function (req, res) {
    console.log("imageUpload_chat-->");
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    console.log("req.files.sampleFile: " + req.files.logo);
    let myFile = req.files.logo;
    console.log("req.files.logo: " + JSON.stringify(req.files.logo));
    // var videoBase64 = myFile;
    // console.log("req.body.eventId: " + req.body.eventId)
    // console.log("blobs[req.body.eventId]: " + JSON.stringify(blobs[req.body.eventId]));
    // var gfs = Grid(conn.db);
    // var writeStream = gfs.createWriteStream({
    //     filename: 'vcRecord.mpg'
    // });
    // var getValue = videoBase64;
    // var byte_string = videoBase64.substr(23);//The base64 has a imageURL
    // var buffer = new Buffer(getValue);   //new Buffer(b64string, 'base64');  you can use base64 encoding with creating new buffer string
    // var response = streamifier.createReadStream(buffer).pipe(writeStream);  // returns response which is having all information regarding saved byte string
    // var lastInsertedFileId = response._store.fileId;  // now you can store it into another document for future use.
    // console.log(lastInsertedFileId);

    // writeStream.on('close', function (file) {
    //     console.log(file.filename + "written to db");
    //     var responseData;
    //     console.log("req.body.id: " + req.body.id);
    //     // if (general.emptyCheck(req.body.id)) {
    //     var queryId = {
    //         "_id": ObjectId(req.body.eventId)
    //     }
    //     console.log("queryId: " + JSON.stringify(queryId));
    //     var setData = {
    //         "vcRecordId": lastInsertedFileId
    //     }
    //     console.log("setData: " + JSON.stringify(setData));
    //     event.update({ "_id": ObjectId(req.body.eventId), 'vcRecordId': { $exists: false } }, { $set: { "vcRecordId": lastInsertedFileId } }, function (err, data) {
    //         var io = req.app.get('socketio');
    //         io.emit('eventUpdatedForHistory', {});
    //         console.log("data: " + JSON.stringify(data));
    //     })
    // })
    // responseData = {
    //     status: true,
    //     errorCode: 200,
    //     message: "insert Successfull and Failed to send mail",
    // };
    // res.status(200).send(responseData);
    console.log("<--recordVideo");

}


module.exports.getRecordVideo = function (req, res) {
    console.log("getRecordVideo-->");

    var gfs = Grid(conn.db);
    var output = '';
    var readStream = gfs.createReadStream({
        "_id": req.params.id // this id was stored in db when inserted a video stream above
    });
    readStream.on("data", function (chunk) {
        output += chunk;
    });

    readStream.on("end", function () {
        console.log("Final Output");
        responseData = {
            status: true,
            message: "get successful",
            data: output
        };
        res.status(200).send(responseData);
        //console.log(output);

    });
    console.log("<--getRecordVideo");
}