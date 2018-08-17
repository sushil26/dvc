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
            console.log("uploaded successfully into directory");
            var gfs = Grid(conn.db);
            var writeStream = gfs.createWriteStream({
                filename: fileName
            });

            var response = fs.createReadStream(chatFileDirectory + fileName).pipe(writeStream);
            var lastInsertedFileId = response._store.fileId;
            console.log("lastInsertedFileId: " + lastInsertedFileId);

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
            // var responseData = {
            //     "status": true,
            //     "message": "date stored successfully",
            //     "data": { "filePath": "/schoolLogo/" + fileName }
            // }
            // res.status(200).send(responseData);
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
    //var vals ='';
    //  res.set(200, {'Content-Type': 'image/jpeg'});
    var readStream = gfs.createReadStream({
        "_id": req.params.id // this id was stored in db when inserted a video stream above
    });
    readStream.on("data", function (chunk) {
        console.log("chunk: " + JSON.stringify(chunk));
        console.log("chunk.data: " + chunk.data);
        output += chunk.data;
        vals = (new Buffer(chunk)).toString('base64')
        console.log("vals: " + JSON.stringify(vals));
    });
    // base64.decode(output, function (err, output) {
    //     console.log('output');
    //     // dump contents to console when complete

    // });
    readStream.on('error', function (err) {
        console.log('An error occurred!', err);
        throw err;
    });

    readStream.on("end", function () {
        console.log("Final Output");
        console.log("vals: " + JSON.stringify(vals));
        // console.log("res: "+res[1].dbgileName.bufer,'binary');
        // readStream.pipe(res);
        responseData = {
            status: true,
            message: "get file successful",
            data: "data:image/jpg;base64," + vals
        };
        res.status(200).send(responseData);
        console.log("responseData: " + JSON.stringify(responseData));

    });

    console.log("<--getRecordVideo");
}
