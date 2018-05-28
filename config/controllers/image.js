// var multer = require('multer');
// var storage = multer.diskStorage({

//     destination: function (req, file, cb) {
//         console.log("storage");
//         cb(null, './public/schoolLogo/')
//     },
//     filename: function (req, file, cb) {
//         if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
//             var err = new Error();
//             err.code = 'filetype';
//             return cb(err);
//         }
//         else {
//             var fileFullPath = file.originalname + '-' + Date.now() + '.jpg';
//             console.log("fileFullPath: " + fileFullPath);
//             cb(null, fileFullPath)
//         }
//     }
// });
// var upload = multer({ storage: storage, limits: { fileSize: 1000000 } }).single('logo');

/* ##### End upload file  ##### */


// module.exports.upload = function (req, res) {
//     console.log("uploadProfile Image--> ");
//     console.log("req.file: " + req.file);
//     console.log("req.myProfPic: " + req.logo);
//     upload(req, res, function (err) {
//         // console.log("req.myProfPic: " + req.myProfPic);
//         // console.log("req.file: " + req.file);
//         // console.log("req.files: " + req.files);
//         // console.log("req.file.originalname: "+req.file.originalname);

//         if (err) {
//             console.log("errrr: imageUpload.js " + err);
//             if (err.code === 'LIMIT_FILE_SIZE') {
//                 res.json({ success: false, message: 'File size is too large, max limit is 10MB' });
//             }
//             else if (err.code === 'filetype') {
//                 res.json({ success: false, message: 'File type is invalid, must be match with jpg/jpeg/png' });
//             }
//             else {
//                 console.log(err);
//                 res.json({ success: false, message: 'File was not able to upload' });
//             }

//         }
//         else {
//             console.log("req.file: " + req.file);
//             if (!req.file) {
//                 res.json({ success: true, message: 'No file was selected' });
//             }
//             else {
//                 // console.log("*path: "+req.file.path);
//                 // console.log("*filename: "+req.file.filename);
//                 // console.log("*destination: "+req.file.destination);
//                 var uploadProfPicPath = "schoolLogo/" + req.file.filename;
//                 // console.log("uploadProfPicPath: "+uploadProfPicPath);
//                 res.json({ success: true, message: 'File was uploaded', fileFullPath: uploadProfPicPath });
//             }
//         }
//     })
//     console.log("uploadProfile Image--> ");
// }
var fs = require('fs');
var path = require('path');
var general = require("../general.js");

module.exports.upload = function (req, res) {
    console.log("uploadProfile Image--> ");
if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
    console.log("req.files.sampleFile: "+req.files.logo);
    //console.log("req.files.originalname: "+req.files.originalname);
    //var fileFullPath = file.originalname
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  // let sampleFile = req.files.logo;
  // console.log(" req.files.logo.name: "+ req.files.logo.name);
  let myFile = req.files.logo;
  //console.log(__dirname+myFile.name, require.main.filename, process.cwd());
 // console.log("myFile--"+myFile)
  var fileArr = myFile.name.split(".");
  var fileName="";
  for(var i=0;i<fileArr.length-1;i++)
  {
   fileName=fileName+fileArr[i]
  }
  fileName=fileName+"_"+general.date()+"."+fileArr[fileArr.length-1];
  console.log("fileName--"+fileName)
  //res.json(fileName)
  myFile.mv("/public/schoolLogo/", function(err) {
       if (err){
           console.log(require('util').inspect(err));
           return res.status(500).send(err);
       }
       res.status(200).send("/public/schoolLogo/"+fileName);
   });
  // fs.readFile(req.files.path, function(err, data) {
  //   var path = __dirname + '/public/schoolLogo' + file.name;
  //   fs.writeFile(path, data, function(err) {
  //   });
  // });

  // sampleFile.mv(__dirname+'/public/schoolLogo/', function(err) {
  //   if (err)
  //     return res.status(500).send(err);

  //   res.send('File uploaded!');
  // });

  // Use the mv() method to place the file somewhere on your server
  // sampleFile.mv('./public/schoolLogo/', function(err) {
  //   if (err){
  //     return res.status(500).send(err);
  //     console.log("err: "+JSON.stringify(err));
  //   }
  //   res.send('File uploaded!'); 
  //     //res.json({ success: true, message: 'File was uploaded', fileFullPath: uploadProfPicPath });
    
  // });
  console.log("uploadProfile Image--> ");
}