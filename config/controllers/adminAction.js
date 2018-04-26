var db = require("../dbConfig.js").getDb();
var user = db.collection("user"); /* ### Teacher collection  ### */
var stud = db.collection("student"); /* ### student collection  ### */

var general = require("../general.js");
var ObjectId = require("mongodb").ObjectID;
var bodyParser = require('body-parser');

var csv = require('fast-csv');


module.exports.getAllClass = function (req, res) {
    console.log("getAllClass-->");
    var responseData;
    stud.find().toArray(function (err, studentList) {
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

module.exports.uploadAttendance = function (req, res) {
    console.log("uploadAttendance-->");
    var responseData;
    var marker; /* ### Note: marker is used for identify the status of update query ###*/
    console.log("req.files: " + req.files.img);
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var studentDataFile = req.files.img;
    console.log("studentDataFile: " + studentDataFile);

    var parser = csv.fromString(studentDataFile.data.toString(), {
        headers: true,
        ignoreEmpty: true
    }).on("data", function (data) {
        console.log("data: " + JSON.stringify(data));
        //parser.pause();
        // var studId = {
        //     "studId": data.studId
        // }
        // console.log("date: "+data.date);
        var date = data.date;
        console.log("date: "+date);
        var reqDate = date.getDate();
        var reqMonth = date.getMonth();
        var reqYear = date.getFullYear();
        // var reqHr = date.getHours();
        // var reqMin = date.getMinutes();
        // var reqSec = date.getSeconds();
        var consolidateDate = new Date(reqYear, reqMonth, reqDate);
        console.log("consolidateDate: " + consolidateDate);
        var testType = [{
            "date": data.date,
            "Attentance": data.attendance

        }]
        // console.log("testType: " + JSON.stringify(testType));
        // stud.findOneAndUpdate({ "studId": data.studId }, { $set: { "Attentance": testType } }, { upsert: false, multi: true, returnNewDocument: true }, function (err, studentList) {

        //     console.log("studentList:" + JSON.stringify(studentList));
        //     if (err) {
        //         console.log("err");
        //         marker = false;
        //         // process.nextTick(callback);
        //     }
        //     else {
        //         console.log("no err");
        //         marker = true;
        //         // process.nextTick(callback);
        //     }
        //     parser.resume();
        // })
    })
        .on("end", function () {
            console.log("end marker: " + marker);
            if (marker == false) {
                responseData = {
                    status: false,
                    message: "Failed to get Data"
                };
                res.status(400).send(responseData);
            }
            else if (marker == true) {
                responseData = {
                    status: true,
                    message: "Successfull updated data"
                };

                res.status(200).send(responseData);
            }
        });
    console.log("<--uploadAttendance");
};

module.exports.uploadMark = function (req, res) {
    console.log("attendanceMarkSave-->");
    var responseData;
    var marker; /* ### Note: marker is used for identify the status of update query ###*/
    console.log("req.files: " + req.files.img);
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var studentDataFile = req.files.img;
    console.log("studentDataFile: " + studentDataFile);

    var parser = csv.fromString(studentDataFile.data.toString(), {
        headers: true,
        ignoreEmpty: true
    }).on("data", function (data) {
        console.log("data: " + JSON.stringify(data));
        parser.pause();

        var studId = {
            "studId": data.studId
        }
        var testType = [{
            "testType": data.testType,
            "subjectMarks":
                {
                    "English": data.English,
                    "Physics": data.Physics,
                    "Math": data.Math
                }
        }]
        console.log("testType: " + JSON.stringify(testType));
        stud.findOneAndUpdate({ "studId": data.studId }, { $set: { "testType": testType } }, { upsert: false, multi: true, returnNewDocument: true }, function (err, studentList) {

            console.log("studentList:" + JSON.stringify(studentList));
            if (err) {
                console.log("err");
                marker = false;
                // process.nextTick(callback);
            }
            else {
                console.log("no err");
                marker = true;
                // process.nextTick(callback);
            }
            parser.resume();
        })
    })
        .on("end", function () {
            console.log("end marker: " + marker);
            if (marker == false) {
                responseData = {
                    status: false,
                    message: "Failed to get Data"
                };
                res.status(400).send(responseData);
            }
            else if (marker == true) {
                responseData = {
                    status: true,
                    message: "Successfull updated data"
                };

                res.status(200).send(responseData);
            }
        });
    console.log("<--attendanceMarkSave");
};


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