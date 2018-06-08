var db = require("../dbConfig.js").getDb();
var general = require("../general.js");
var bodyParser = require("body-parser");
var record = db.collection("record"); /* ### Teacher collection  ### */
var ObjectId = require("mongodb").ObjectID;
var nodemailer = require("nodemailer");
var createdDate = new Date();
var randomstring = require("randomstring");
var requireFromUrl = require('require-from-url');
var dataurl = require('dataurl');
var transporter = nodemailer.createTransport({
    service: "godaddy",
    auth: {
        user: "info@vc4all.in",
        pass: "ctpl@123"
    },
    tls: {
        rejectUnauthorized: false
    }
});
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vc');
var conn = mongoose.connection;
var Grid = require('gridfs-stream');
var fs = require('fs');
const path = require('path');
const ABSPATH = path.dirname(process.mainModule.filename); // Absolute path to our app directory
Grid.mongo = mongoose.mongo;

const recordingDirectory = process.cwd() + '/public/Recording/';

// var gfs = Grid(db,mongo);
// var gridfs = require('mongoose-gridfs')({
//     collection: 'attachments',
//     model: 'Attachment',
//     mongooseConnection: db
// });

//obtain a model
//Attachment = gridfs.model;

module.exports.pswdCheck = function (req, res) {
    console.log("pswdCheck-->");
    console.log("req.body.password: " + req.body.password);
    var password = req.body.password;
    var careatorEmail = req.body.careatorEmail;
    if (general.emptyCheck(password) && general.emptyCheck(careatorEmail)) {
        var obj = {
            "email": careatorEmail
        }
        console.log("obj: " + JSON.stringify(obj));
        record.find(obj).toArray(function (err, findData) {
            console.log("findData: " + JSON.stringify(findData));
            if (err) {
                responseData = {
                    status: false,
                    message: "Process failed"
                };
                res.status(400).send(responseData);
            }
            else {
                if (findData.length > 0) {
                    if (findData[0].password == password) {
                        responseData = {
                            status: true,
                            message: "Login Successfully"
                        };
                        res.status(200).send(responseData);
                    }
                    else {
                        responseData = {
                            status: false,
                            message: "Password is wrong"
                        };
                        res.status(400).send(responseData);
                    }
                }
                else {
                    responseData = {
                        status: false,
                        message: "Email ID is not valid"
                    };
                    res.status(400).send(responseData);
                }
            }
        })
    }
    else {
        responseData = {
            status: false,
            message: "Empty value found"
        };
        res.status(400).send(responseData);
    }
    console.log("<--pswdCheck");
}
module.exports.pswdGenerate = function (req, res) {
    console.log("pswdGenerate-->");
    console.log("req.body.careatorEmail: " + req.body.careatorEmail);
    var email = req.body.careatorEmail;
    var emailSplit = email.split('@');
    var password = randomstring.generate(7);
    var responseData;

    if (general.emptyCheck(req.body.careatorEmail)) {
        if (emailSplit[1] == 'careator.com') {
            var obj = {
                "email": email,
                "password": password
            }
            record.find({ "email": email }).toArray(function (err, findData) {
                if (findData.length > 0) {
                    record.update({ "email": email }, { $set: { "password": password } }, function (err, data) {
                        if (err) {
                            responseData = {
                                status: true,
                                errorCode: 200,
                                message: "Process not successful"
                            };
                            res.status(200).send(responseData);
                        }
                        else {
                            var mailOptions = {
                                from: "info@vc4all.in",
                                to: email,
                                subject: 'VC4ALL Credential',
                                html: "<table style='border:10px solid gainsboro;'><thead style=background:cornflowerblue;><tr><th><h2>Greetings from VC4ALL</h2></th></tr></thead><tfoot style=background:#396fc9;color:white;><tr><td style=padding:15px;><p><p>Regards</p><b>Careator Technologies Pvt. Ltd</b></p></td></tr></tfoot><tbody><tr><td><b>Dear Careator Employee,</b></td></tr><tr><td>Please note, Your email Id is verified successfully, you can access the below link by using given password.<p style=background:gainsboro;>Password: " + password + "</p></td></tr></tbody></table>"

                                // "<html><body><p><b>Dear Careator Employee, </b></p><p>Please note, Your email Id is verified successfully,  you can access the below link by using given password.<p>Password: "+password+"</p></p><p>Regards</p><p><b>Careator Technologies Pvt. Ltd</b></p></body></html>"

                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    responseData = {
                                        status: true,
                                        errorCode: 200,
                                        message: "insert Successfull and Failed to send mail",
                                        data: data
                                    };
                                    res.status(200).send(responseData);
                                } else {
                                    console.log("Email sent: " + info.response);
                                    responseData = {
                                        status: true,
                                        errorCode: 200,
                                        message: "Successfully mail sent",
                                        data: data
                                    };
                                    res.status(200).send(responseData);
                                }
                            });
                        }
                    })

                }
                else {
                    record.insert(obj, function (err, data) {
                        if (err) {
                            responseData = {
                                status: true,
                                errorCode: 200,
                                message: "Process not successful"
                            };
                            res.status(200).send(responseData);
                        }
                        else {
                            var mailOptions = {
                                from: "info@vc4all.in",
                                to: email,
                                subject: 'VC4ALL Credential',
                                html: "<table style='border:10px solid gainsboro;'><thead style=background:cornflowerblue;><tr><th><h2>Greetings from VC4ALL</h2></th></tr></thead><tfoot style=background:#396fc9;color:white;><tr><td style=padding:15px;><p><p>Regards</p><b>Careator Technologies Pvt. Ltd</b></p></td></tr></tfoot><tbody><tr><td><b>Dear Careator Employee,</b></td></tr><tr><td>Please note, Your email Id is verified successfully, you can access the below link by using given password.<p style=background:gainsboro;>Password: " + password + "</p></td></tr></tbody></table>"
                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    responseData = {
                                        status: true,
                                        errorCode: 200,
                                        message: "insert Successfull and Failed to send mail",
                                        data: data
                                    };
                                    res.status(200).send(responseData);
                                } else {
                                    console.log("Email sent: " + info.response);
                                    responseData = {
                                        status: true,
                                        errorCode: 200,
                                        message: "Successfully mail sent",
                                        data: data
                                    };
                                    res.status(200).send(responseData);
                                }
                            });
                        }
                    })
                }

            })

        }
        else {
            responseData = {
                status: false,
                message: "Email id is not valid"
            };
            res.status(400).send(responseData);
        }
    }
    else {
        responseData = {
            status: false,
            message: "Empty value found"
        };
        res.status(400).send(responseData);
    }
    console.log("<--pswdGenerate");
}
module.exports.emailInvite = function (req, res) {
    console.log("careator email Invite-->");
    var mailOptions = {
        from: "info@vc4all.in",
        to: req.body.email,
        subject: "Regarding Instance Meeting",
        html: "<table style='border:10px solid gainsboro;'><thead style=background:cornflowerblue;><tr><th><h2>Greetings from VC4ALL</h2></th></tr></thead><tfoot style=background:#396fc9;color:white;><tr><td style=padding:15px;><p><p>Regards</p><b>Careator Technologies Pvt. Ltd</b></p></td></tr></tfoot><tbody><tr><td><b>Dear Team,</b></td></tr><tr><td> Please note, you have to attend meeting right now, please open the below link.<p style=background:gainsboro;><p>Here your link <a href=" + req.body.url + ">" + req.body.url + "</a></p></td></tr></tbody></table>"

        //html:"<html><head><p><b>Dear Team, </b></p><p>Please note, you have to attend meeting right now, please open the below link.<p>Here your link <a href=" + req.body.url + ">" + req.body.url + "</a> </p><p>Regards</p><p><b>Careator Technologies Pvt. Ltd</b></p></head><body></body></html>"
    };
    console.log("mailOptions: " + JSON.stringify(mailOptions));

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            responseData = {
                status: false,
                message: "Failed to send mail",
            };
            res.status(400).send(responseData);
        } else {
            console.log("Email sent: " + info.response);
            responseData = {
                status: true,
                message: "Successfull sent mail",
            };
            res.status(200).send(responseData);
        }
    });

}

module.exports.recordVideo = function (req, res) {
    console.log("recordVideo-->");
    var url = req.body.url;
    console.log("url: "+req.files.data);
    var fileData = req.files.data;
    // if (!req.files)
    //     return res.status(400).send('No files were uploaded.');
    // console.log("req.files.sampleFile: " + req.files.logo);
    // let myFile = req.files.logo;
    // console.log("path--" + recordingDirectory);
    // var fileArr = myFile.name.split(".");
    // var fileName = "";
    // for (var i = 0; i < fileArr.length - 1; i++) {
    //     fileName = fileName + fileArr[i]
    // }
    // fileName = fileName + "_" + general.date() + "." + fileArr[fileArr.length - 1];
    // console.log("fileName--" + fileName)

    // myFile.mv(dailyPicDirectory + fileName, function (err) {
    //     if (err) {
    //         console.log(require('util').inspect(err));
    //         var responseData = {
    //             "status": true,
    //             "message": "date stored unsuccessfully",
    //             "data": { "err": err }
    //         }
    //         res.status(500).send(responseData);

    //     }
    //     else {

    //     }
    // })

    var readPath = ABSPATH + '/public/Recording/sampleVideo.mpg';
    var gfs = Grid(conn.db);
    var writeStream = gfs.createWriteStream({
        filename: 'sample.mpg'
    });
    // fs.createReadStream(url).pipe(
    //     dataurl.stream({ mimetype: 'dataurl'})
    //   ).pipe(writeStream, {end: false});
    
    //fs.createReadStream(url).pipe(writeStream);
    writeStream.on('close', function (file) {
        console.log(file.filename + "written to db");
    })
    console.log("<--recordVideo");
}
module.exports.getRecordVideo = function (req, res) {
    console.log("getRecordVideo-->");
    // var gfs = Grid(conn.db);
    // var readPath = fs.createWriteStream(ABSPATH + '/public/writeRecord/sample.mpg');
    // var readStream = gfs.createReadStream({
    //     filename: 'sample.mpg'
    // });
    // readStream.pipe(readPath);
    // readPath.on('close', function (file) {
    //     console.log("File heas been wriiten fully");
    // })
    console.log("<--getRecordVideo");
}

