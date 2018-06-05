var nodemailer = require("nodemailer");
var createdDate = new Date();
var randomstring = require("randomstring");
var bodyParser = require("body-parser");


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
    //console.log("req.body.data: " + req.body.data);
    

var mailOptions = {
    from: "info@vc4all.in",
    to: "logeswari.g@careator.com",
    subject: 'VC4ALL Credential',
    attachments: [{
       
        path: __dirname+'/home/img/bc.jpg'
       
    }],
    html: "welcome"
    //html: "<table style='border:10px solid gainsboro;'><thead style=background:cornflowerblue;><tr><th><h2>Greetings from VC4ALL</h2></th></tr></thead><tfoot style=background:#396fc9;color:white;><tr><td style=padding:15px;><p><p>Regards</p><b>Careator Technologies Pvt. Ltd</b></p></td></tr></tfoot><tbody><tr><td><b>Dear Careator Employee,</b></td></tr><tr><td>Please note, Your email Id is verified successfully, you can access the below link by using given password.<p style=background:gainsboro;></p><img src='cid:background.jpg'/></td></tr></tbody></table>"

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