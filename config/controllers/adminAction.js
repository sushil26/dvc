
var db = require("../dbConfig.js").getDb();
var user = db.collection("user"); /* ### Teacher collection  ### */
var stud = db.collection("student"); /* ### student collection  ### */

var general = require("../general.js");
var ObjectId = require("mongodb").ObjectID;
var bodyParser = require('body-parser');

var csv = require('fast-csv');
var d = new Date();

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
    var monthAtt = []; /* ### Note: get all attendance of the month ###*/

    console.log("req.body.files: " + req.files.img);
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    var studentDataFile = req.files.img;
    console.log("studentDataFile: " + studentDataFile);
    var parser = csv.fromString(studentDataFile.data.toString(), {
        headers: true,
        ignoreEmpty: true
    }).on("data", function (data) {
        console.log("data: " + JSON.stringify(data));
        console.log("req.reportType: " + req.params.reportType);
        // parser.pause();

        // var month = {
        //     "attendance.month": AttMonth
        // }
        /* ### Start update daily attendance status  ### */
        if (req.params.reportType == "Daily") {
            console.log("daily started-->");
            var dateString = data.Date;
            var parts = dateString.split(' ');
            console.log("parts: " + JSON.stringify(parts));
            var AttYear = parts[2];
            var AttMonth = parts[1];
            var AttDate = parts[0];
            var attndnce = data.Attendance;

            var obj = { "date": AttDate, "status": attndnce };
            console.log("obj: " + JSON.stringify(obj));
            var studIdForFindQry = {
                "studId": data.StudentID,
                "attendance.month": AttMonth,
                "attendance.dateAttendance": { "date": AttDate, "status": attndnce }
            }
            console.log("studIdForFindQry: " + JSON.stringify(studIdForFindQry));
            var studIdForUpdateQry = {
                "studId": data.StudentID,
                "attendance.month": AttMonth
            }
            console.log("studIdForUpdateQry: " + JSON.stringify(studIdForUpdateQry));
            stud.find(studIdForFindQry).toArray(function (err, findData) {
                console.log("1st query findData: " + JSON.stringify(findData));
                console.log("1st query findData.length: " + findData.length);
                if (err) {
                    marker == true;
                }
                else {
                    if (findData.length == 0) {
                        stud.update(studIdForUpdateQry,
                            { $push: { "attendance.$.dateAttendance": { "date": AttDate, "status": attndnce } } }, function (err, data) {
                                console.log("2nd query started: " + JSON.stringify(data));
                                console.log("2nd query data.length: " + data.length);
                                if (err) {
                                    marker == true;
                                }
                                else {
                                    marker == true;
                                }
                            })
                    }
                    else {

                        responseData = {
                            status: true,
                            message: "Sorry! You already updated for this date"
                        };

                        res.status(200).send(responseData);
                    }
                }
            })
        }
        /* ### End update daily attendance status  ### */
        /* ### Start update monthly attendance status  ### */
        else {
            console.log("monthly started-->");
            console.log("req.params.month: " + req.params.month);
            var marker;
            var studIdForFindQry = {
                "studId": data.StudentID,
                "attendance.month": req.params.month
            }

            if (req.params.month == "Jan") {
                for (var x = 1; x <= 31; x++) {
                    monthAtt.push({ "date": x, "status": data[x] });
                    //  console.log("monthAtt: " + JSON.stringify(monthAtt));
                }
                stud.find({ "studId": data.StudentID,"attendance.month":"Jan" }).toArray(function (err, findData) {
                    console.log("1st query findData: " + JSON.stringify(findData));
                    var arrayLength=findData[0].attendance[0].dateAttendance.length;
                    if (err) {
                        marker == true;
                    }
                    else {

                        if (arrayLength == 0) {
                            console.log("second query started");
                            console.log("findData.length: "+findData.length);
                            stud.update(studIdForFindQry, { $push: { "attendance.$.dateAttendance": monthAtt } }), function (err, findData) {
                                console.log("update month started: " + JSON.stringify(data));

                                if (err) {
                                    marker == true;
                                }
                                else {
                                    marker == true;
                                }
                            }
                        }
                        else {

                            if (marker == false) {
                                responseData = {
                                    status: false,
                                    message: "Sorry! you already updated for this month"
                                };
                                res.status(400).send(responseData);
                            }
                        }
                    }
            })
        }
        /* ### End update monthly attendance status  ### */
    }
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

module.exports.uploadStudentMaster = function (req, res) {
    console.log("uploadStudentMaster-->");
    var responseData;
    var marker;
    var objJson = [];
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var studentDataFile = req.files.img;
    console.log("studentDataFile: " + studentDataFile);
    var parser = csv.fromString(studentDataFile.data.toString(), {
        headers: true,
        ignoreEmpty: true
    }).on("data", function (data) {
        console.log("data: " + JSON.stringify(data));
        var csData = [{ "class": data.Class, "section": data.Section }];
        var userData = {
            schoolName: "ABC",
            studId: data.StudentID,
            studName: data.StudentName,
            parentName: data.FatherName,
            parentEmail: data.FatherEmailId,
            mobileNum: data.FatherPhoneNumber,
            MotherName: data.MotherName,
            MotherEmail: data.MotherEmailid,
            MotherNum: data.MotherPhoneNumber,
            cs: csData,
            pswd: "abc",
            status: "inactive",
            loginType: "studParent",
            attendance: [
                { "month": "Jan", "dateAttendance": [] },
                { "month": "Feb", "dateAttendance": [] },
                { "month": "Mar", "dateAttendance": [] },
                { "month": "Apr", "dateAttendance": [] },
                { "month": "May", "dateAttendance": [] },
                { "month": "Jun", "dateAttendance": [] },
                { "month": "Jul", "dateAttendance": [] },
                { "month": "Aug", "dateAttendance": [] },
                { "month": "Sep", "dateAttendance": [] },
                { "month": "Oct", "dateAttendance": [] },
                { "month": "Nov", "dateAttendance": [] },
                { "month": "Dec", "dateAttendance": [] }
            ]
        };

        objJson.push(userData);
        console.log("userData: " + JSON.stringify(userData));


    })
        .on("end", function () {
            console.log("end marker: " + marker);
            console.log("objJson: " + JSON.stringify(objJson));
            stud.insert(objJson, function (err, data) {
                console.log("data: " + JSON.stringify(data));
                if (err) {
                    responseData = {
                        status: false,
                        message: "Failed to Insert",
                        data: data
                    };
                    res.status(400).send(responseData);
                } else {
                    responseData = {
                        status: true,
                        errorCode: 200,
                        message: "Insert Successfull",
                        data: data
                    };
                    res.status(200).send(responseData);
                }
            });
        });

    console.log("<--uploadStudentMaster");
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