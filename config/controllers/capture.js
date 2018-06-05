var nodemailer = require("nodemailer");
var createdDate = new Date();
var randomstring = require("randomstring");
var bodyParser = require("body-parser");
const path = require('path');
const ABSPATH = path.dirname(process.mainModule.filename); // Absolute path to our app directory

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

module.exports.captureImgSend = function (req, res) {
    console.log("captureImgSend-->");
    console.log("req.files: " + req.files);
    console.log("req.files.logo: " + req.files.logo);

    var mailOptions = {
        from: "info@vc4all.in",
        to: "logeswari.g@careator.com",
        subject: 'VC4ALL Credential',
        // html: 'Embedded image: <img src="cid:unique@kreata.ee"/>',
        // attachments: [{
        //     filename: 'image.png',
        //     path: ABSPATH + '/public/home/img/bc.jpg',
        //     cid: 'unique@kreata.ee' //same cid value as in the html img src
        // }]
        html: 'Embedded image: <img src=cid:'+req.body.data+'/>',
        attachments: [{
            filename: 'selfi.jpg',
            path: req.body.data,
            cid: req.body.data //same cid value as in the html img src
        }]
    };
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //         responseData = {
    //             status: true,
    //             errorCode: 200,
    //             message: "insert Successfull and Failed to send mail",
    //             data: data
    //         };
    //         res.status(200).send(responseData);
    //     } else {
    //         console.log("Email sent: " + info.response);
    //         responseData = {
    //             status: true,
    //             errorCode: 200,
    //             message: "Successfully mail sent",
    //             data: data
    //         };
    //         res.status(200).send(responseData);
    //     }
    // });
}