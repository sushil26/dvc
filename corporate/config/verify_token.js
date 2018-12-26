var jwt = require('jsonwebtoken');
const config = require('./config.json');

module.exports = function (req, res, next) {
    console.log("------------------------------------->verify_token----->");
    console.log("headers: "+JSON.stringify(req.headers));
    var token = req.headers.token;
    if (token) {
        console.log("token present");
        console.log("config.jwt_secret: "+config.jwt_secret);
        // verifies secret and checks exp
        jwt.verify(token, config.jwt_secret, function (err, decoded) {
            if (err) { //failed verification.
                console.log("err: "+JSON.stringify(err));
                return res.json({
                    "status": false,
                    "errorCode": 403,
                    "message": "You do not allowed for this resource"
                });
            }
            req.decoded = decoded;
            next(); //no error, proceed
        });
    } else {
        console.log("token not present");
        // forbidden without token
        return res.status(403).send({
            "status": false,
            "errorCode": 403,
            "message": "You do not allowed for this resource"
        });
    }
}