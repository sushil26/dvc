import { Z_SYNC_FLUSH } from "zlib";

var db = require("../dbConfig.js").getDb();
var user = db.collection("user"); /* ### Teacher collection  ### */
var stud = db.collection("student"); /* ### student collection  ### */

var general = require("../general.js");
var ObjectId = require("mongodb").ObjectID;
var bodyParser = require('body-parser');

var csv = require('fast-csv');
// var d = new Date();

module.exports.getAllClass = function (req, res) {
    console.log("getAllClass-->");
    var responseData;
    stud.find().toArray(function (err, studentList) {
        console.log("studentList: "+JSON.stringify(studentList));
        if (err) {
            responseData = {
                status: false,
                message: "Failed to get Data",
                data: data
            };
            res.status(400).send(responseData);
        } else {
            var allClass = [];
            // console.log("studentList: "+JSON.stringify(studentList));
            console.log("studentList.length: " + studentList.length);
            for (var len = 0; len < studentList.length; len++) {
                var cls = studentList[len].cs[0].class;
                var sec = studentList[len].cs[0].section;
                console.log("cls: " + cls);
                allClass.push({ "class": cls, "section": sec });
            }

            responseData = {
                status: true,
                message: "Successfull retrived data",
                data: allClass
            };

            res.status(200).send(responseData);
        }
    });

    console.log("<--getAllClass");
};

// module.exports.uploadAttendance = function (req, res) {
//     console.log("uploadAttendance-->");
//     var responseData;
//     var marker; /* ### Note: marker is used for identify the status of update query ###*/
//     console.log("req.files: " + req.files.img);
//     if (!req.files)
//         return res.status(400).send('No files were uploaded.');

//     var studentDataFile = req.files.img;
//     console.log("studentDataFile: " + studentDataFile);

//     var parser = csv.fromString(studentDataFile.data.toString(), {
//         headers: true,
//         ignoreEmpty: true
//     }).on("data", function (data) {
//         console.log("data: " + JSON.stringify(data));

//         parser.pause();
//         var studId = {
//             "studId": data.studentID
//         }
//         console.log("studId: " + JSON.stringify(studId));

//         var dateString = data.date;
//         var parts = dateString.split(' ');
//         console.log("parts: " + JSON.stringify(parts));
//         var AttYear = parts[2];
//         var AttMonth = parts[1];
//         var AttDate = parts[0];

//         // var attendance = [{
//         //     AttYear: [{
//         //         AttMonth: [{ AttDate: data.attendance }]
//         //     }]
//         // }]
//         var dt = {};
//         var dm = {};
//         var dy = {};
//         dt[AttDate] = data.attendance;
//         dm[AttMonth] = [dt];
//         dy[AttYear] = [dm];
//         var attendance = [dy];

//         console.log("attendance: " + JSON.stringify(attendance));
//         module.exports.updateData = function (data, callback) {
//             stud.find({ "studId": data.studentID, "attendance": { $exists: false } }).toArray(function (err, data) {
//                 console.log("query started: " + JSON.stringify(data));
//                 console.log("query data.length: " + data.length);
//                 if (err) {
//                     console.log("err");
//                     responseData = {
//                         status: false,
//                         message: "Failed to upload attendance data",
//                         data: data
//                     };
//                     res.status(400).send(responseData);
//                 }
//                 else {
//                     if (data.length == 0) {
//                         stud.findOneAndUpdate(studId, { $set: { "attendance": attendance } }), function (err, updatedData) {

//                             console.log("updated data: " + JSON.stringify(updatedData));
//                             if (err) {
//                                 console.log("err");
//                                 marker = false;
//                                 process.nextTick(callback);
//                             }
//                             else {
//                                 marker = true;
//                                 process.nextTick(callback);
//                             }
//                         }
//                     }
//                     else{
//                         var att = {};
//                         var y = att[AttYear];
//                         var x = [y];
//                         console.log("x: "+x);

//                         // stud.find({ "studId": data.studentID, attendance[AttYear]:{ $exists: false } }).toArray(function (err, data) {
//                         // }))
//                     }
//                 }
//             })
//         }
//     })
//         .on("end", function () {
//             console.log("end marker: " + marker);
//             if (marker == false) {
//                 responseData = {
//                     status: false,
//                     message: "Failed to get Data"
//                 };
//                 res.status(400).send(responseData);
//             }
//             else if (marker == true) {
//                 responseData = {
//                     status: true,
//                     message: "Successfull updated data"
//                 };

//                 res.status(200).send(responseData);
//             }
//         });
//     console.log("<--uploadAttendance");
// };

// module.exports.uploadMark = function (req, res) {
//     console.log("attendanceMarkSave-->");
//     var responseData;
//     var marker; /* ### Note: marker is used for identify the status of update query ###*/
//     console.log("req.files: " + req.files.img);
//     if (!req.files)
//         return res.status(400).send('No files were uploaded.');

//     var studentDataFile = req.files.img;
//     console.log("studentDataFile: " + studentDataFile);

//     var parser = csv.fromString(studentDataFile.data.toString(), {
//         headers: true,
//         ignoreEmpty: true
//     }).on("data", function (data) {
//         console.log("data: " + JSON.stringify(data));
//         parser.pause();

//         var studId = {
//             "studId": data.studId
//         }
//         var testType = [{
//             "testType": data.testType,
//             "subjectMarks":
//                 {
//                     "English": data.English,
//                     "Physics": data.Physics,
//                     "Math": data.Math
//                 }
//         }]
//         console.log("testType: " + JSON.stringify(testType));
//         stud.findOneAndUpdate({ "studId": data.studId }, { $set: { "testType": testType } }, { upsert: false, multi: true, returnNewDocument: true }, function (err, studentList) {

//             console.log("studentList:" + JSON.stringify(studentList));
//             if (err) {
//                 console.log("err");
//                 marker = false;
//                 // process.nextTick(callback);
//             }
//             else {
//                 console.log("no err");
//                 marker = true;
//                 // process.nextTick(callback);
//             }
//             parser.resume();
//         })
//     })
//         .on("end", function () {
//             console.log("end marker: " + marker);
//             if (marker == false) {
//                 responseData = {
//                     status: false,
//                     message: "Failed to get Data"
//                 };
//                 res.status(400).send(responseData);
//             }
//             else if (marker == true) {
//                 responseData = {
//                     status: true,
//                     message: "Successfull updated data"
//                 };

//                 res.status(200).send(responseData);
//             }
//         });
//     console.log("<--attendanceMarkSave");
// };


// module.exports.updateData = function (data, callback) {
//     console.log('updateData-->');

//     var studId = {
//         "studId": data.studId
//     }
//     var testType = [{
//         "testType": data.testType,
//         "subjectMarks":
//             {
//                 "English": data.English,
//                 "Physics": data.Physics,
//                 "Math": data.Math
//             }

//     }]
//     console.log("testType: " + JSON.stringify(testType));
//     stud.findOneAndUpdate({ "studId": data.studId }, { $set: { "testType": testType } }, { upsert: false, multi: true, returnNewDocument: true }, function (err, studentList) {

//         console.log("studentList:" + JSON.stringify(studentList));
//         if (err) {
//             console.log("err");
//             marker = false;
//             process.nextTick(callback);
//         }
//         else {
//             console.log("no err");
//             marker = true;
//             process.nextTick(callback);
//         }
//     })

//     console.log('<--updateData');

// }