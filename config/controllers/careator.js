var db = require("../dbConfig.js").getDb();
var general = require("../general.js");
var bodyParser = require("body-parser");
var careatorEmp = db.collection("careatorEmp"); /* ### Teacher collection  ### */
var ObjectId = require("mongodb").ObjectID;
var nodemailer = require("nodemailer");
var createdDate = new Date();
var randomstring = require("randomstring");

var careatorMaster = db.collection("careatorMaster"); /* ### careator employee collection  ### */
var careatorChatGroup = db.collection("careatorChatGroup"); /* ### careatorChatGroup collection  ### */
var careatorVideoGroup = db.collection("careatorVideoGroup"); /* ### careatorChatGroup collection  ### */
var csv = require('fast-csv');
var careatorMasterArray = [];

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

var chatHistory = db.collection("chatHistory");

module.exports.RemoteJoinCheck = function (req, res) {
    console.log("RemoteJoinCheck-->");
    console.log("req.body.careator_remoteEmail: " + req.body.careator_remoteEmail + " req.body.careator_remotePswd" + req.body.careator_remotePswd);
    console.log("req.body.url: " + req.body.url);
    var password = req.body.careator_remotePswd;
    var remote_careatorEmail = req.body.careator_remoteEmail;
    var url = req.body.url;
    if (general.emptyCheck(password) && general.emptyCheck(remote_careatorEmail)) {
        var obj = {
            "remoteEmailId": remote_careatorEmail,
            "password": password
        }
        console.log("obj: " + JSON.stringify(obj));
        careatorEmp.find({ "sessionURL": url, "invite": { $elemMatch: { "remoteEmailId": remote_careatorEmail, "password": password } } }).toArray(function (err, findData) {
            console.log("findData: " + JSON.stringify(findData));
            console.log("findData.length: " + findData.length);
            if (err) {
                responseData = {
                    status: false,
                    message: "Process failed"
                };
                res.status(400).send(responseData);
            }
            else {
                if (findData.length > 0) {
                    responseData = {
                        status: true,
                        message: "Login Successfully"
                    };
                    res.status(200).send(responseData);
                }
                else {
                    responseData = {
                        status: false,
                        message: "Credential Mismatch"
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
}

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
        careatorEmp.find(obj).toArray(function (err, findData) {
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
                        careatorMaster.find({ "email": careatorEmail }).toArray(function (err, careatorMasterFind) {
                            if (err) {
                                responseData = {
                                    status: false,
                                    message: "This email is not in DB",
                                    data: err
                                };
                                res.status(400).send(responseData);
                            }
                            else {
                                console.log("careatorMasterFind: "+JSON.stringify(careatorMasterFind));
                                if (careatorMasterFind.length > 0) {
                                    responseData = {
                                        status: true,
                                        message: "Login Successfully",
                                        data: careatorMasterFind[0]
                                    };
                                    res.status(200).send(responseData);
                                }
                            }
                        })

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
                "password": password,
                "invite": []
            }
            careatorEmp.find({ "email": email }).toArray(function (err, findData) {
                if (findData.length > 0) {
                    careatorEmp.update({ "email": email }, { $set: { "password": password, "invite": [] } }, function (err, data) {
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
                    careatorEmp.insert(obj, function (err, data) {
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
    console.log("req.body.sessionHost: " + req.body.sessionHost + " req.body.email: " + req.body.email + " req.body.url: " + req.body.url);
    var password = randomstring.generate(7);
    console.log("password: " + password);


    careatorEmp.update({ email: req.body.sessionHost }, { $push: { "invite": { "remoteEmailId": req.body.email, "password": password } } }, function (err, data) {
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
                to: req.body.email,
                subject: 'VC4ALL Credential',
                html: "<table style='border:10px solid gainsboro;'><thead style=background:cornflowerblue;><tr><th><h2>Greetings from VC4ALL</h2></th></tr></thead><tfoot style=background:#396fc9;color:white;><tr><td style=padding:15px;><p><p>Regards</p><b>Careator Technologies Pvt. Ltd</b></p></td></tr></tfoot><tbody><tr><td><b>Dear Careator Employee,</b></td></tr><tr><td>Please note, You get the invitation from VC4ALL and sended by " + req.body.sessionHost + " you can access the below link by using given password.<p style=background:gainsboro;>Password: " + password + "</p><a href=" + req.body.url + " style=background:gainsboro;>URL: Click Me</p></td></tr></tbody></table>"
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

module.exports.setCollection = function (req, res) {
    console.log("setCollection-->");
    console.log("req.body.url: " + req.body.url);
    console.log("req.body.email: " + req.body.email);

    var obj = {
        "email": req.body.email,
        "url": req.body.url,
        "chat": [],
        "session_dateTime": new Date()
    }
    console.log("obj: " + JSON.stringify(obj));

    careatorEmp.update({ "email": req.body.email }, { $set: { "sessionURL": req.body.url, "invite": [], "session_dateTime": new Date() } }, function (err, urlUpdate) {
        if (err) {
            console.log("err: " + JSON.stringify(err));
            responseData = {
                status: false,
                message: "Unsuccessfull, go back and refresh then start session"
            };
            res.status(400).send(responseData);
        }
        else {
            chatHistory.insertOne(obj, function (err, data) {
                if (err) {
                    console.log("err: " + JSON.stringify(err));
                    responseData = {
                        status: false,
                        message: "UnSuccessfully"
                    };
                    res.status(400).send(responseData);
                }
                else {
                    console.log("data: " + JSON.stringify(data));
                    var obj = {
                        "url": req.body.url
                    }
                    responseData = {
                        status: true,
                        message: "Successfully",
                        data: obj
                    };
                    res.status(200).send(responseData);
                }
            })
        }
    })




}

module.exports.getHistoryByEmailId = function (req, res) {
    console.log("setCollection-->");
    var email = req.params.email;
    var obj = {
        "email": email,
    }
    console.log("obj: " + JSON.stringify(obj));
    chatHistory.find(obj).toArray(function (err, data) {
        console.log("data: " + JSON.stringify(data));
        console.log("data.length: " + data.length);
        if (err) {
            console.log("err: " + JSON.stringify(err));
            responseData = {
                status: false,
                message: "UnSuccessfully"
            };
            res.status(400).send(responseData);
        }
        else {
            console.log("data: " + JSON.stringify(data));
            responseData = {
                status: true,
                message: "Successfully",
                data: data
            };
            res.status(200).send(responseData);
        }
    })


}

module.exports.getHistory = function (req, res) {
    console.log("getHistory-->");

    chatHistory.find().toArray(function (err, data) {
        console.log("data: " + JSON.stringify(data));
        console.log("data.length: " + data.length);
        if (err) {
            console.log("err: " + JSON.stringify(err));
            responseData = {
                status: false,
                message: "UnSuccessfully"
            };
            res.status(400).send(responseData);
        }
        else {
            console.log("data: " + JSON.stringify(data));
            responseData = {
                status: true,
                message: "Successfully",
                data: data
            };
            res.status(200).send(responseData);
        }
    })


}


module.exports.careatorMasterInsert = function (req, res) {
    console.log("careatorMasterInsert-->");
    var responseData;
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var userDataFile = req.files.img;
    console.log("userDataFile: " + userDataFile);
    var parser = csv.fromString(userDataFile.data.toString(), {
        headers: true,
        ignoreEmpty: true
    }).on("data", function (data) {
        console.log("data: " + JSON.stringify(data));
        var obj = {
            "email": data.Email,
            "videoRights": data.VideoRights,
            "chatRights": data.ChatRights
        }
        console.log("obj: " + JSON.stringify(obj));

        careatorMasterArray.push(obj);
    })
        .on("end", function () {
            console.log("end marker: ");
            careatorMaster.insert({ $each: consolidateCS }, function (err, insertedData) {
                if (err) {
                    console.log("err: " + JSON.stringify(err));
                    responseData = {
                        status: false,
                        message: "Insert Unsuccessful"
                    };
                    res.status(400).send(responseData);
                } else {
                    console.log("insertedData: " + JSON.stringify(insertedData));
                    responseData = {
                        status: true,
                        message: "Insert Successfull",
                    };
                    res.status(200).send(responseData);
                }
            })
        })
}

module.exports.careator_getAllEmp = function (req, res) {
    console.log("careator_getAllEmp-->");
    var response;
    careatorMaster.find().toArray(function (err, allEmp) {
        if (err) {
            console.log("err: " + JSON.stringify(err));
            response = {
                status: fasle,
                message: err
            };
            res.status(400).send(responseData);
        }
        else {
            console.log("allEmp: " + JSON.stringify(allEmp));
            response = {
                status: true,
                message: allEmp
            };
            res.status(200).send(responseData);
        }
    })

}

module.exports.careator_chat_creteGroup = function (req, res) {
    console.log("careator_chat_creteGroup-->");
    var response;
    var groupName = req.body.groupName;
    var groupMembers = req.body.groupMembers;
    if (general.emptyCheck(groupName)) {

        var insertObj = {
            "groupName": groupName,
            "groupMembers": groupMembers
        }
        careatorChatGroup.insert(insertObj, function (err, groupCreate) {
            if (err) {
                console.log("err: " + JSON.stringify(err));
                response = {
                    status: fasle,
                    message: "Unsuccessfull group creation",
                    data: err
                };
                res.status(400).send(responseData);
            }
            else {
                console.log("groupCreate: " + JSON.stringify(groupCreate));
                response = {
                    status: true,
                    message: "Successfully group created",
                    data: groupCreate
                };
                res.status(200).send(responseData);
            }
        })
    }
    else {
        console.log("Epty value found");
        var groupName = {
            "groupName": groupName
        }
        response = {
            status: false,
            message: "empty value found",
            data: groupName
        };
        res.status(400).send(response);
    }

}

module.exports.careator_video_creteGroup = function (req, res) {
    console.log("careator_video_creteGroup-->");
    var response;
    var groupName = req.body.groupName;
    var groupMembers = req.body.groupMembers;
    if (general.emptyCheck(groupName)) {

        var insertObj = {
            "groupName": groupName,
            "groupMembers": groupMembers
        }
        careatorVideoGroup.insert(insertObj, function (err, groupCreate) {
            if (err) {
                console.log("err: " + JSON.stringify(err));
                response = {
                    status: fasle,
                    message: "Unsuccessfull group creation",
                    data: err
                };
                res.status(400).send(responseData);
            }
            else {
                console.log("groupCreate: " + JSON.stringify(groupCreate));
                response = {
                    status: true,
                    message: "Successfully group created",
                    data: groupCreate
                };
                res.status(200).send(responseData);
            }
        })
    }
    else {
        console.log("Epty value found");
        var groupName = {
            "groupName": groupName
        }
        response = {
            status: false,
            message: "empty value found",
            data: groupName
        };
        res.status(400).send(response);
    }

}




