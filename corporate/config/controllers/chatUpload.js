var mongoose = require('mongoose');
var general = require("../general.js");
mongoose.connect('mongodb://localhost/vc');
var conn = mongoose.connection;
var Grid = require('gridfs-stream');
var streamifier = require('streamifier');
var ObjectId = require("mongodb").ObjectID;
var fs = require('fs');
const path = require('path');
const ABSPATH = path.dirname(process.mainModule.filename); // Absolute path to our app directory
Grid.mongo = mongoose.mongo;
var blobs = [];
const chatFileDirectory = process.cwd() + '/public/chatFiles/';

module.exports.chatFileUpload = function (req, res) {
    console.log("chatFileUpload-->");
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    console.log("req.files.sampleFile: " + req.files.img);
    let myFile = req.files.img;
    console.log("path--" + chatFileDirectory);
    var fileArr = myFile.name.split(".");
    var fileName = "";
    for (var i = 0; i < fileArr.length - 1; i++) {
        fileName = fileName + fileArr[i]
    }
    fileName = fileName + "_" + general.date() + "." + fileArr[fileArr.length - 1];
    console.log("fileName--" + fileName)

    myFile.mv(chatFileDirectory + fileName, function (err) {
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
            var gfs = Grid(conn.db);
            var writeStream = gfs.createWriteStream({
                filename: fileName,
                mode: 'w',
                content_type: req.files.img.mimetype,
                metadata: userDataFile
            });

            console.log("lastInsertedFileId: " + lastInsertedFileId);
            var response = fs.createReadStream( "/public/chatFiles/" + fileName).pipe(writestream);
            var lastInsertedFileId = response._store.fileId;


            writeStream.on('close', function (file) {
                console.log(file.filename + "written to db");
                var responseData;
                var setData = {
                    "vcRecordId": lastInsertedFileId
                }

                responseData = {
                    status: true,
                    errorCode: 200,
                    message: "insert Successfull and Failed to send mail",
                    data: lastInsertedFileId
                };
                res.status(200).send(responseData);
            })
            var responseData = {
                "status": true,
                "message": "date stored successfully",
                "data": { "filePath": "/schoolLogo/" + fileName }
            }
            res.status(200).send(responseData);
        }
    });





    // var userDataFile = req.files.img;

    // var chatFile = req.files.img
    // console.log("chatFile: " + JSON.stringify(chatFile));


    console.log("<--recordVideo");
}

module.exports.getChatFileUpload = function (req, res) {
    console.log("getChatFileUpload-->");
    console.log("req.params.id: " + req.params.id);

    var gfs = Grid(conn.db);
    var output = '';
    var readStream = gfs.createReadStream({
        "_id": ObjectId(req.params.id) // this id was stored in db when inserted a video stream above
    });
    readStream.on("data", function (chunk) {
        console.log("chunk: " + chunk);
        output += chunk;
    });
    // base64.decode(output, function (err, output) {
    //     console.log('output');
    //     // dump contents to console when complete

    // });
    readStream.on("end", function () {
        console.log("Final Output");
        responseData = {
            status: true,
            message: "get file successful",
            data: output
        };
        res.status(200).send(responseData);
        //console.log(output);

    });

    console.log("<--getRecordVideo");
}
