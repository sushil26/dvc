var jwt = require('jsonwebtoken');
const config = require('./config.json');

module.exports = function(req,res,next) {
    console.log("------------------------------------->verify_token----->");
  var token = req.body.token ;
    if (token) {
        console.log("token present");
    // verifies secret and checks exp
        jwt.verify(token, config.jwt_secret, function(err, decoded) {
            if (err) { //failed verification.
                return res.json({"error": true});
            }
            req.decoded = decoded;
            next(); //no error, proceed
        });
    } else {
        console.log("token not present");
        // forbidden without token
        return res.status(403).send({
            "error": true
        });
    }
}