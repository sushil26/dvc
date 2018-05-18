var mongoose = require('mongoose');
var Schema = mongoose.Schema;
titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');

// create a schema
var studentSchema = new Schema({
 
  schoolName: { type: String, required: true },
  schoolId: {type: String, required: true, unique: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  parentName: {type: String, required: true},
  parentEmail: {type: String, required: true, unique: true},
  mobileNum: {type: Number, required: true, unique: true},
  motherName: {type: String, required: true},
  motherEmail: {type: String, required: true, unique: true},
  motherNum: {type: Number, required: true, unique: true},
  cs: [{
    "class": {type: Number, required: true},
    "section": {type: String, required: true}
  }],
  dob: {type: Date, required: true},
  doj: {type: Date, required: true},
  pswd: { type: String, required: true },
  status: { type: String, required: true },
  loginType: { type: String, required: true },
  attendance: [
    { "month": {type: String, required: true}, "dateAttendance": [] },
    { "month": {type: String, required: true}, "dateAttendance": [] },
    { "month": {type: String, required: true}, "dateAttendance": [] },
    { "month": {type: String, required: true}, "dateAttendance": [] },
    { "month": {type: String, required: true}, "dateAttendance": [] },
    { "month": {type: String, required: true}, "dateAttendance": [] },
    { "month": {type: String, required: true}, "dateAttendance": [] },
    { "month": {type: String, required: true}, "dateAttendance": [] },
    { "month": {type: String, required: true}, "dateAttendance": [] },
    { "month": {type: String, required: true}, "dateAttendance": [] },
    { "month": {type: String, required: true}, "dateAttendance": [] },
    { "month": {type: String, required: true}, "dateAttendance": [] }
],
mark: [
    { "testType": {type: String, required: true}, "subjectWithMark": [] },
    { "testType": {type: String, required: true}, "subjectWithMark": [] },
    { "testType": {type: String, required: true}, "subjectWithMark": [] },
    { "testType": {type: String, required: true}, "subjectWithMark": [] },
    { "testType": {type: String, required: true}, "subjectWithMark": [] },
],  
  created_at: Date,
 
});


studentSchema.plugin(titlize, {
  paths: ['schoolName','firstName','lastName','parentName', 'motherName' ]
});

module.exports = mongoose.model('student',studentSchema, 'student');
