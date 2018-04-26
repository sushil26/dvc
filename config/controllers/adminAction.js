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

module.exports.uploadMark = function (req, res) {
    console.log("attendanceMarkSave-->");
    var responseData;
    var marker; /* ### Note: marker is used for identify the status of update query ###*/
    console.log("req.files: " + req.files.img);
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var studentDataFile = req.files.img;
    console.log("studentDataFile: " + studentDataFile);

    csv.fromString(studentDataFile.data.toString(), {
        headers: true,
        ignoreEmpty: true
    }).on("data", function (data) {
        console.log("data: " + JSON.stringify(data));
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
                marker = false;
            } else {
                marker = true;
            }
        })
       
    })
        .on("end", function () {
            if (marker == false) {
                responseData = {
                    status: false,
                    message: "Failed to get Data",
                    data: data
                };
                res.status(400).send(responseData);
            }
            else if (marker == true) {
                responseData = {
                    status: true,
                    message: "Successfull retrived data",
                    data: allClass
                };

                res.status(200).send(responseData);
            }
        });
    console.log("<--attendanceMarkSave");
};


  