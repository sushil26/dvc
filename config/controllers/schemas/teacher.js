var mongoose = require('mongoose');
var Schema = mongoose.Schema;
titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');

// create a schema
var teacherSchema = new Schema({
    schoolName: { type: String, required: true },
    schoolId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNum: { type: Number, required: true, unique: true },
    dob: { type: Date, required: true },
    doj: { type: Date, required: true },
    cs: [],
    timeTable: [],
    pswd: { type: String, required: true },
    status: { type: String, required: true },
    loginType: { type: String, required: true },
    created_at: Date,
});


teacherSchema.plugin(titlize, {
    paths: ['schoolName', 'firstName', 'lastName', 'parentName', 'motherName']
});

module.exports = mongoose.model('user', teacherSchema, 'user');
