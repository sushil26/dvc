var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vc');
var conn = mongoose.connection;
var Grid = require('gridfs-stream');
var streamifier = require('streamifier');
var fs = require('fs');
const path = require('path');
const ABSPATH = path.dirname(process.mainModule.filename); // Absolute path to our app directory
Grid.mongo = mongoose.mongo;
var blobs = [];

module.exports.chatFileUpload = function (req, res) {
    console.log("chatFileUpload-->");
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var userDataFile = req.files.img;
   // console.log("userDataFile: " + userDataFile);
    // console.log("req.body.logo: "+req.body.img);
    var chatFile = req.files.img
console.log("chatFile: "+JSON.stringify(chatFile));
   
       
        
        var gfs = Grid(conn.db);
        var writeStream = gfs.createWriteStream({
            filename: req.files.img.name,
            mode: 'w',
            content_type: req.files.img.mimetype,
            metadata: userDataFile
            
        });
        var buffer = new Buffer(chatFile);
        console.log("buffer: "+buffer );
        // var response = fs.createReadStream(req.files.img.path).pipe(writestream);
      
        // var getValue = chatFile;
        // //var byte_string = videoBase64.substr(23);//The base64 has a imageURL
        // //var buffer = new Buffer(byte_string);   //new Buffer(b64string, 'base64');  you can use base64 encoding with creating new buffer string
        // // var buffer = new Buffer(chatFile);   //new Buffer(b64string, 'base64');  you can use base64 encoding with creating new buffer string
        // // var response = streamifier.createReadStream(buffer).pipe(writeStream);  // returns response which is having all information regarding saved byte string
        // var lastInsertedFileId = response._store.fileId;  // now you can store it into another document for future use.
        // console.log(lastInsertedFileId);

        writeStream.on('close', function (file) {
            console.log(file.filename + "written to db");
            var responseData;
            console.log("req.body.id: " + req.body.id);
          
            // var queryId = {
            //     "_id": ObjectId(req.body.eventId)
            // }
            // console.log("queryId: " + JSON.stringify(queryId));
            var setData = {
                "vcRecordId": lastInsertedFileId
            }
            console.log("setData: " + JSON.stringify(setData));
            // event.update({ "_id": ObjectId(req.body.eventId), 'vcRecordId': { $exists: false } }, { $set: { "vcRecordId": lastInsertedFileId } }, function (err, data) {
            //     var io = req.app.get('socketio');
            //     io.emit('eventUpdatedForHistory', {});
            //     console.log("data: " + JSON.stringify(data));
            // })
            responseData = {
                status: true,
                errorCode: 200,
                message: "insert Successfull and Failed to send mail",
            };
            res.status(200).send(responseData);
        })
        


    console.log("<--recordVideo");
}