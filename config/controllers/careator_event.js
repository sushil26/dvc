var db = require("../dbConfig.js").getDb();
var general = require("../general.js");
var property = require("../../property.json");
var ObjectId = require("mongodb").ObjectID;
var nodemailer = require("nodemailer");
var randomstring = require("randomstring");
var careatorMaster = db.collection("careatorMaster"); /* ### careator employee collection  ### */
var careatorEvents = db.collection("careatorEvents"); /* ### careatorChatGroup collection  ### */


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

module.exports.careator_sendEventSchedule = function (req, res) {
    console.log("careator_eventSend-->");
    var responseData;
    console.log("req.body.senderName: " + req.body.senderName);
    console.log("req.body.senderId: " + req.body.senderId);
    console.log("req.body.reason: " + req.body.reason);
    
    if (general.emptyCheck(req.body.senderName) && general.emptyCheck(req.body.senderId) && general.emptyCheck(req.body.reason) ) {
        var password = 'abc';
        var userData = {
            "senderId": req.body.senderId,
            "senderName": req.body.senderName,
            "senderEmail": req.body.senderEmail,
            "title": req.body.title,
            "reason": req.body.reason,
            "invitingTo": req.body.invitingTo,
            "formatedStartTime": req.body.formatedStartTime,
            "formatedEndTime": req.body.formatedEndTime,
            "startsAt": req.body.startsAt,
            "endsAt": req.body.endsAt,
            "primColor": req.body.primColor,
            "url": req.body.url,
            "date" : req.body.date,
            "notificationNeed": 'yes',
            "password": password
        }
        console.log("userData: " + JSON.stringify(userData));

        careatorEvents.insertOne(userData, function (err, data) {
            console.log("data: " + JSON.stringify(data));
            if (err) {
                responseData = {
                    "status": false,
                    "message": "Failed to Register",
                    "data": data
                }
                res.status(400).send(responseData);
            }
            else {
                // var io = req.app.get('socketio');
                // io.emit('eventUpdated', { "id": req.body.remoteCalendarId, "remoteId": req.body.remoteCalendarId }); /* ### Note: Emit message to upcomingEventCtrl.js ### */
                var mailOptions = {
                    from: "info@vc4all.in",
                    to: req.body.invitingTo,
                    subject: "Regarding Meeting",
                    html: "<table style='border:10px solid gainsboro;'><thead style='background-image: linear-gradient(to bottom, #00BCD4 0%, #00bcd40f 100%);'><tr><th><h2>Greetings from VC4ALL</h2></th></tr></thead><tfoot style=background:#00bcd4;color:white;><tr><td style=padding:15px;><p><p>Regards</p><b>Careator Technologies Pvt. Ltd</b></p></td></tr></tfoot><tbody><tr><td><b>Dear Team,</b></td></tr><tr><td><p>Please note, you have to attend meeting regarding <b>" + req.body.reason + " </b>please open the below link at sharp " + req.body.formatedStartTime + " to " + req.body.formatedEndTime + " on "+req.body.date+" </p><p style=background:gainsboro;>Here your link and password for meeting <a href=" + req.body.url + ">" + req.body.url + "</a> and Password: " + password + "</p></td></tr></tbody></table>"
                    // html: "<html><head><p><b>Dear Parents, </b></p><p>Please note, you have to attend meeting regarding <b>" + req.body.reason + " </b>please open the below link at sharp " + req.body.startAt + " to " + req.body.endAt + "</p><p style=background:gainsboro;>Here your link and password for meeting <a href=" + req.body.url + ">" + req.body.url + "</a> and Password: " + password + "</p><p>Regards</p><p><b>Careator Technologies Pvt. Ltd</b></p></head><body></body></html>"
                };
                console.log("mailOptions: " + JSON.stringify(mailOptions));
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        responseData = {
                            "status": true,
                            "errorCode": 200,
                            "message": "Registeration Successfull and Failed to send mail",
                            "data": userData
                        }
                        res.status(200).send(responseData);

                    } else {
                        console.log('Email sent: ' + info.response);
                        responseData = {
                            "status": true,
                            "errorCode": 200,
                            "message": "Registeration Successfull and sent mail",
                            "data": userData
                        }
                        res.status(200).send(responseData);
                    }

                });
            }
        })
    }
    else {
        console.log("Epty value found");
        responseData = {
            "status": false,
            "message": "empty value found",
            "data": userData
        }
        res.status(400).send(responseData);
    }
}