
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
   var month ={ "month":"Jan", "id":1}, {"month":"Feb", "id":1}, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12 }
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

        // parser.pause();
        var studId = {
            "studId": data.studentID
        }
        console.log("studId: " + JSON.stringify(studId));

        var dateString = data.date;
        var parts = dateString.split(' ');
        console.log("parts: " + JSON.stringify(parts));
        var AttYear = parts[2];
        var AttMonth = parts[1];
        var AttDate = parts[0];
        var attndnce = data.attendance;

        var obj = { "date": AttDate, "status": attndnce };
        // var attendance = [{
        //     AttYear: [{
        //         AttMonth: [{ AttDate: data.attendance }]
        //     }]
        // }]

        // var dt = {};
        // var dm = {};
        // var dy = {};
        // dt[AttDate] = data.attendance;
        // dm[AttMonth] = [dt];

        // var attendance = [dm];

        // console.log("attendance: " + JSON.stringify(attendance));
        // module.exports.updateData = function (data, callback) {
            // var attendance={"month":AttMonth};
        stud.findOneAndUpdate({ "studId": data.studentID}, {"attendance.month":AttMonth}),{$push:{"attendance.month.dateAttendance":obj}}.toArray(function (err, data) {
            console.log("query started: " + JSON.stringify(data));
            console.log("query data.length: " + data.length);
            if (err) {
                marker == true;
                // console.log("err");
                // responseData = {
                //     status: false,
                //     message: "Failed to upload attendance data",
                //     data: data
                // };
                // res.status(400).send(responseData);
            }
            else {
                marker == true;
                // if (data.length == 0) {
                //     console.log("0 length");
                    // stud.update({ "studId": data.studentID }, { $set: { "attendance": attendance } }), function (err, updatedData) {

                    //     console.log("updated data: " + JSON.stringify(updatedData));
                    //     if (err) {
                    //         console.log("err");
                    //         marker = false;
                    //         process.nextTick(callback);
                    //     }
                    //     else {
                    //         marker = true;
                    //         process.nextTick(callback);
                    //     }
                    // }
                // }
                // else {
                    
                    // console.log("more than 0 length");
                    // var att = {};
                    // var ddt = {};
                    // var ddm = {};
                    // ddt[AttDate] = attndnce;
                    // ddm[AttMonth] = ddt;

                    // console.log("dm: " + JSON.stringify(ddm));
                    // var x = {
                    //     "18": [AttMonth]
                    // }
                    // parser.pause();
                    // stud.find({ "studId": data.studentID, "18.[+\AttMonth\+]": { $exists: true } }).toArray(function (err, attData) {
                    //     console.log("2nd query started: " + JSON.stringify(attData));
                    //     console.log("2nd query data.length: " + attData.length);
                    // })
                // }
            }
        })
        // }
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
                { "month":"Jan","dateAttendance" :[] },
                { "month":"Feb","dateAttendance" : [] },
                {  "month":"Mar","dateAttendance" : []},
                {  "month":"Apr","dateAttendance" : []},
                {  "month":"May","dateAttendance" : []},
                {  "month":"Jun","dateAttendance" : []},
                {  "month":"Jul","dateAttendance" : []},
                {  "month":"Aug","dateAttendance" : []},
                {  "month":"Sep","dateAttendance" : []},
                {  "month":"Oct","dateAttendance" : []},
                {  "month":"Nov","dateAttendance" : []},
                {  "month":"Dec","dateAttendance" : []}
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