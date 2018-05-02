
var db = require("../dbConfig.js").getDb();
var user = db.collection("user"); /* ### Teacher collection  ### */
var stud = db.collection("student"); /* ### student collection  ### */
var school = db.collection("school"); /* ### school collection  ### */


var general = require("../general.js");
var ObjectId = require("mongodb").ObjectID;
var bodyParser = require('body-parser');

var csv = require('fast-csv');
var d = new Date();
var message;
var month;
var marker; /* ### Note: marker is used for identify the status of update query ###*/
var monthAtt = []; /* ### Note: get all attendance of the month ###*/
var unknownData = [];
var attendanceIndex; /* ### Note: dateAttendance index based on month select  ### */
var schoolName; /* ### Note: Get School Name of API  ### */

module.exports.getSchoolUser = function (req, res) {
    console.log("getSchoolUser-->");
    var responseData;
    var schoolUserList = {
        "schoolTeacherList": [],
        "schoolStudentList": []
    };
    user.find({ "schoolName": req.params.schoolName }).toArray(function (err, data) {
        console.log("data: " + JSON.stringify(data));

        if (err) {
            responseData = {
                status: false,
                message: "Failed to get Data",
                data: data
            };
            res.status(400).send(responseData);
        } else {
            schoolUserList.schoolTeacherList.push(data[0]);
            console.log("schoolUserList: " + JSON.stringify(schoolUserList));

            stud.find({ "schoolName": req.params.schoolName }).toArray(function (err, data) {
                console.log("data: " + JSON.stringify(data));

                if (err) {
                    responseData = {
                        status: false,
                        message: "Failed to get Data",
                        data: data
                    };
                    res.status(400).send(responseData);
                } else {
                    schoolUserList.schoolStudentList.push(data[0]);
                    console.log("schoolUserList: " + JSON.stringify(schoolUserList));
                    responseData = {
                        status: true,
                        message: "All user collected successfully",
                        data: schoolUserList
                    };

                    res.status(200).send(responseData);

                }

            })
            console.log("<--getSchoolUser");
        }


        module.exports.uploadClassFile = function (req, res) {
            console.log("uploadClassFile-->");
            var responseData;
            var section = [];
            var classSection = [];
            var consolidateCS = [];
            schoolName = req.params.schoolName;

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
                var parts = data.Section.split(',');
                for (var x = 0; x <= parts.length; x++) {

                    if (general.emptyCheck(parts[x])) {
                        section.push(parts[x]);
                    }
                }
                console.log("section: " + JSON.stringify(section));
                consolidateCS.push({ "class": data.Class, "section": section });
                section = [];
                console.log("parts: " + JSON.stringify(parts));
                // classSection.push({"class":data.class, "section":[data]})
                // parser.pause();
            })
                .on("end", function () {
                    console.log("end ");
                    console.log("consolidateCS: " + JSON.stringify(consolidateCS));
                    console.log("schoolName:" + schoolName);
                    school.findOneAndUpdate({ "schoolName": schoolName }, { $push: { "cs": { $each: consolidateCS } } }, { returnNewDocument: true }, function (err, data) {
                        console.log("data: " + JSON.stringify(data));
                        if (err) {
                            responseData = {
                                status: false,
                                message: err

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
            console.log("<--uploadClassFile");
        };

        module.exports.uploadAttendance = function (req, res) {
            console.log("uploadAttendance-->");
            var responseData;
            schoolName = req.params.schoolName;

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
                parser.pause();
                if (req.params.reportType == "Daily") {
                    console.log("daily started-->");
                    module.exports.dailyData(data, function (err) {
                        console.log("savedatInitiate");
                        // TODO: handle error

                        parser.resume();
                    });
                }
                if (req.params.reportType == "Monthly") {
                    month = req.params.month;
                    module.exports.monthlyData(data, function (err) {
                        console.log("savedatInitiate");
                        // TODO: handle error
                        console.log("unknownData: " + JSON.stringify(unknownData));
                        parser.resume();
                    });
                }


            })
                .on("end", function () {
                    console.log("end marker: " + marker);
                    if (marker == false) {
                        responseData = {
                            status: false,
                            message: message
                        };
                        res.status(400).send(responseData);
                    }
                    else if (marker == true) {
                        console.log("unknownData: " + JSON.stringify(unknownData));
                        var unknownStud = unknownData;
                        responseData = {
                            status: true,
                            message: "Successfull updated data",
                            data: unknownStud
                        };
                        unknownData = [];
                        res.status(200).send(responseData);
                    }


                });
            console.log("<--uploadAttendance");
        };

        module.exports.dailyData = function (data, callback) {
            console.log('inside saving')
            // Simulate an asynchronous operation:
            //  /* ### Start update daily attendance status  ### */

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
                "schoolName": schoolName,
                "attendance.month": AttMonth,
                "attendance.dateAttendance": { "date": AttDate, "status": attndnce }
            }
            console.log("studIdForFindQry: " + JSON.stringify(studIdForFindQry));
            var studIdForUpdateQry = {
                "studId": data.StudentID,
                "attendance.month": AttMonth,
                "schoolName": schoolName
            }
            console.log("studIdForUpdateQry: " + JSON.stringify(studIdForUpdateQry));
            stud.find(studIdForFindQry).toArray(function (err, findData) {
                console.log("1st query findData: " + JSON.stringify(findData));
                console.log("1st query findData.length: " + findData.length);
                if (err) {
                    marker = true;
                    if (callback) callback();
                }
                else {
                    if (findData.length == 0) {
                        stud.update(studIdForUpdateQry, { $push: { "attendance.$.dateAttendance": { "date": AttDate, "status": attndnce } } }, function (err, data) {
                            console.log("2nd query started: " + JSON.stringify(data));
                            console.log("2nd query data.length: " + data.length);
                            if (err) {
                                marker = true;
                                if (callback) callback();
                            }
                            else {
                                marker = true;
                                if (callback) callback();
                            }
                        })
                    }
                    else {
                        marker = false;

                        message = "Sorry! You already updated for this date";

                        if (callback) callback();
                    }
                }
            })

            // /* ### End update daily attendance status  ### */

        }

        module.exports.monthlyData = function (data, callback) {
            console.log('inside saving')
            var arrayLength
            console.log("monthly started-->");
            console.log("req.params.month: " + month);
            // var marker;
            var studIdForFindQry = {
                "studId": data.StudentID,
                "attendance.month": month,
                "schoolName": schoolName
            }

            if (month == "Jan") {
                console.log("JAN");
                attendanceIndex = 0;
                for (var x = 1; x <= 31; x++) {
                    console.log("x: " + x);
                    monthAtt.push({ "date": x, "status": data[x] });
                    if (x == 31) {
                        break;
                    }
                }
            }
            else if (month == "Feb") {
                console.log("FEB");
                attendanceIndex = 1;
                for (var x = 1; x <= 28; x++) {
                    console.log("x: " + x);
                    monthAtt.push({ "date": x, "status": data[x] });
                    if (x == 28) {
                        break;
                    }

                }
            }
            console.log("*monthAtt: " + monthAtt.length);
            stud.find({ "schoolName": schoolName, "studId": data.StudentID }).toArray(function (err, isThereData) {
                console.log("Basic query: " + JSON.stringify(isThereData));
                console.log("Basic query: " + isThereData.length);
                if (err) {
                    console.log("error: " + err);
                    message = err;
                    marker = false;
                    if (callback) callback();
                }
                else {
                    if (isThereData.length > 0) {
                        console.log("month: " + month);
                        stud.find({ "schoolName": schoolName, "studId": data.StudentID, "attendance.month": month }).toArray(function (err, findData) {
                            console.log("1st query findData: " + JSON.stringify(findData));
                            console.log("attendanceIndex: " + JSON.stringify(findData[0].attendance[attendanceIndex]));
                            console.log("dateAttendance: " + JSON.stringify(findData[0].attendance[attendanceIndex].dateAttendance));
                            arrayLength = findData[0].attendance[attendanceIndex].dateAttendance.length;
                            if (err) {
                                console.log("error: " + err);
                                message = err;
                                marker = false;
                                if (callback) callback();
                            }
                            else {
                                console.log("no erroe");
                                console.log("arrayLength: " + arrayLength);
                                if (arrayLength == 0) {
                                    console.log("second query started");
                                    console.log("studIdForFindQry: " + JSON.stringify(studIdForFindQry));
                                    console.log("monthAtt: " + JSON.stringify(monthAtt));
                                    stud.update(studIdForFindQry, { $push: { "attendance.$.dateAttendance": { $each: monthAtt } } }, function (err, findData) {
                                        console.log("update month started: " + JSON.stringify(data));
                                        monthAtt = [];
                                        if (err) {
                                            marker = false;
                                            message = err;
                                            if (callback) callback();
                                        }
                                        else {
                                            marker = true;
                                            if (callback) callback();
                                        }
                                    })
                                }
                                else {
                                    marker = false;
                                    message = "Sorry! you already updated for this month";
                                    if (callback) callback();
                                }

                            }
                        })
                    }
                    else {
                        console.log("unknown started");
                        var obj = {
                            "StudentID": data.StudentID,
                            "StudentName": data.StudentName
                        }
                        unknownData.push(obj);
                        if (callback) callback();
                    }
                }
            })
        }


        // /* ### Start update monthly attendance status  ### */
        // else {
        //     var arrayLength
        //     console.log("monthly started-->");
        //     console.log("req.params.month: " + req.params.month);
        //     var marker;
        //     var studIdForFindQry = {
        //         "studId": data.StudentID,
        //         "attendance.month": req.params.month
        //     }

        //     if (req.params.month == "Jan") {
        //         console.log("data: " + JSON.stringify(data));
        //         for (var x = 1; x <= 31; x++) {
        //             console.log("x: " + x);
        //             monthAtt.push({ "date": x, "status": data[x] });

        //             if (x == 31) {
        //                 console.log("*monthAtt: " + JSON.stringify(monthAtt));
        //                 stud.find({ "studId": data.StudentID, "attendance.month": "Jan" }).toArray(function (err, findData) {
        //                     console.log("1st query findData: " + JSON.stringify(findData));
        //                     arrayLength = findData[0].attendance[0].dateAttendance.length;
        //                     if (err) {
        //                         marker == true;
        //                     }
        //                     else {

        //                         if (arrayLength == 0) {
        //                             console.log("second query started");
        //                             console.log("findData.length: " + findData.length);
        //                             stud.update(studIdForFindQry, { $push: { "attendance.$.dateAttendance": monthAtt } }), function (err, findData) {
        //                                 console.log("update month started: " + JSON.stringify(data));

        //                                 if (err) {
        //                                     marker == true;
        //                                 }
        //                                 else {
        //                                     marker == true;

        //                                 }
        //                             }
        //                         }
        //                         else {

        //                             if (marker == false) {
        //                                 responseData = {
        //                                     status: false,
        //                                     message: "Sorry! you already updated for this month"
        //                                 };
        //                                 res.status(400).send(responseData);
        //                             }
        //                         }
        //                     }
        //                 })
        //             }
        //         }



        //     }

        // }
        // /* ### End update monthly attendance status  ### */

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
            // var cs = [{"class":req.params.class,"section":req.params.section}];
            if (!req.files)
                return res.status(400).send('No files were uploaded.');

            var studentDataFile = req.files.img;
            console.log("studentDataFile: " + studentDataFile);
            var parser = csv.fromString(studentDataFile.data.toString(), {
                headers: true,
                ignoreEmpty: true
            }).on("data", function (data) {
                console.log("data: " + JSON.stringify(data));
                var csData = [{ "class": req.params.class, "section": req.params.section }];
                var userData = {
                    schoolName: req.params.schoolName,
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

        module.exports.uploadTeacherMaster = function (req, res) {
            console.log("uploadStudentMaster-->");
            var responseData;
            var marker;
            var css = [];
            var objJson = [];
            // var cs = [{"class":req.params.class,"section":req.params.section}];
            if (!req.files)
                return res.status(400).send('No files were uploaded.');

            var studentDataFile = req.files.img;
            console.log("studentDataFile: " + studentDataFile);
            var parser = csv.fromString(studentDataFile.data.toString(), {
                headers: true,
                ignoreEmpty: true
            }).on("data", function (data) {
                console.log("data: " + JSON.stringify(data));
                // var csData = [{ "class": req.params.class, "section": req.params.section }];
                var userData = {
                    schoolName: req.params.schoolName,
                    schoolId: data.TeacherID,
                    firstName: data.FirstName,
                    lastName: data.LastName,
                    email: data.Email,
                    mobileNum: data.PhoneNumber,
                    dob: data.DOB,
                    doj: data.DOJ,
                    pswd: "abc",
                    css: [],
                    timeTable: [],
                    status: "inactive",
                    loginType: "teacher"
                }
                var cssParts = data.ClassSectionSubject.split(',');
                console.log("cssParts: " + JSON.stringify(cssParts));
                for (var x = 0; x < cssParts.length; x++) {
                    if (cssParts[x] != "") {
                        var cssSeparate = cssParts[x].split('-');
                        console.log("cssSeparate: " + JSON.stringify(cssSeparate));
                        userData.css.push({ "class": cssSeparate[0], "section": cssSeparate[1], "subject": cssSeparate[2] });
                    }
                }
                console.log("userData: " + JSON.stringify(userData));
                objJson.push(userData);
            })
                .on("end", function () {
                    console.log("end marker: " + marker);
                    console.log("objJson: " + JSON.stringify(objJson));
                    user.insert(objJson, function (err, data) {
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