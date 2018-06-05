var nodemailer = require("nodemailer");
var createdDate = new Date();
var randomstring = require("randomstring");


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
console.log("req.body.data: "+req.body.data);
}