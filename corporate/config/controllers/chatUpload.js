var mongoose = require('mongoose');
var general = require("../general.js");



// const ABSPATH = path.dirname(process.mainModule.filename); // Absolute path to our app directory

// var blobs = [];
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vc');
var conn = mongoose.connection;
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);
//const chatFileDirectory = process.cwd() + '/public/chatFiles/';

// module.exports.chatFileUpload = function (req, res) {
//     console.log("chatFileUpload-->");
//     if (!req.files)
//         return res.status(400).send('No files were uploaded.');
//     console.log("req.files.sampleFile: " + req.files.img);
//     let myFile = req.files.img;
//     console.log("path--" + chatFileDirectory);
//     var fileArr = myFile.name.split(".");
//     var fileName = "";
//     for (var i = 0; i < fileArr.length - 1; i++) {
//         fileName = fileName + fileArr[i]
//     }
//     fileName = fileName + "_" + general.date() + "." + fileArr[fileArr.length - 1];
//     console.log("fileName--" + fileName)

//     myFile.mv(chatFileDirectory + fileName, function (err) {
//         if (err) {
//             console.log(require('util').inspect(err));
//             var responseData = {
//                 "status": true,
//                 "message": "date stored unsuccessfully",
//                 "data": { "err": err }
//             }
//             res.status(500).send(responseData);
//         }
//         else {
//             console.log("uploaded successfully into directory");
//             var gfs = Grid(conn.db);
//             var writeStream = gfs.createWriteStream({
//                 filename: fileName
//             });

//             var response = fs.createReadStream(chatFileDirectory + fileName).pipe(writeStream);
//             var lastInsertedFileId = response._store.fileId;
//             console.log("lastInsertedFileId: " + lastInsertedFileId);

//             writeStream.on('close', function (file) {
//                 console.log(file.filename + "written to db");
//                 var responseData;
//                 var setData = {
//                     "vcRecordId": lastInsertedFileId
//                 }

//                 responseData = {
//                     status: true,
//                     errorCode: 200,
//                     message: "insert Successfull and Failed to send mail",
//                     data: lastInsertedFileId
//                 };
//                 res.status(200).send(responseData);
//             })
//             // var responseData = {
//             //     "status": true,
//             //     "message": "date stored successfully",
//             //     "data": { "filePath": "/schoolLogo/" + fileName }
//             // }
//             // res.status(200).send(responseData);
//         }
//     });





//     // var userDataFile = req.files.img;

//     // var chatFile = req.files.img
//     // console.log("chatFile: " + JSON.stringify(chatFile));


//     console.log("<--recordVideo");
// }

// module.exports.getChatFileUpload = function (req, res) {
//     console.log("getChatFileUpload-->");
//     console.log("req.params.id: " + req.params.id);

//     var gfs = Grid(conn.db);
//     var output = '';
//     //var vals ='';
//     //  res.set(200, {'Content-Type': 'image/jpeg'});
//     var readStream = gfs.createReadStream({
//         "_id": req.params.id // this id was stored in db when inserted a video stream above
//     });
//     readStream.on("data", function (chunk) {
//         console.log("chunk: " + JSON.stringify(chunk));
//         console.log("chunk.data: " + chunk.data);
//         output += chunk.data;
//         vals = (new Buffer(chunk)).toString('base64')
//         console.log("vals: " + JSON.stringify(vals));
//     });
//     // base64.decode(output, function (err, output) {
//     //     console.log('output');
//     //     // dump contents to console when complete

//     // });
//     readStream.on('error', function (err) {
//         console.log('An error occurred!', err);
//         throw err;
//     });

//     readStream.on("end", function () {
//         console.log("Final Output");
//         console.log("vals: " + JSON.stringify(vals));
//         // console.log("res: "+res[1].dbgileName.bufer,'binary');
//         // readStream.pipe(res);
//         responseData = {
//             status: true,
//             message: "get file successful",
//             data: "data:image/jpg;base64," + vals
//         };
//         //readStream.pipe(responseData);
//         res.status(200).send(responseData);
//         console.log("responseData: " + JSON.stringify(responseData));

//     });

//     console.log("<--getRecordVideo");
// }


/* ##### Start Multer  ##### */
/** Setting up storage using multer-gridfs-storage */
var storage = GridFsStorage({
    url: 'mongodb://localhost/vc',
    filename: function (req, file, cb) {
        console.log("filename-->");
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    },
    /** With gridfs we can store aditional meta-data along with the file */
    metadata: function (req, file, cb) {
        console.log("metadata-->");
        cb(null, { originalname: file.originalname });
    },
    root: 'cfFiles' //root name for collection to store files into
});

var cfUpload = multer({ //multer settings for single upload
    storage: storage
}).single('file');

/** API path that will upload the files */
module.exports.chatFileUpload = function (req, res) {
    console.log("chatFileUpload-->");
    console.log("gfs: " + gfs);
    cfUpload(req, res, function (err) {
        console.log("cfUpload from storage");
        // console.log("req.originalname: "+res.files.originalname);
        console.log("req.originalname: "+res.file.originalname);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null });
    });
};

module.exports.getChatFileUpload = function (req, res) {
    var gfs = Grid(conn.db);
    gfs.collection('cfFiles'); //set collection name to lookup into

    /** First check if file exists */
    gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
        if (!files || files.length === 0) {
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        /** create read stream */
        var readstream = gfs.createReadStream({
            filename: files[0].filename
        });
        /** set the proper content type */
        res.set('Content-Type', files[0].contentType)
        /** return response */
        return readstream.pipe(res);
    });
};
/* ##### End Multer  ##### */