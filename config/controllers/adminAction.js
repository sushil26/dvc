var db = require("../dbConfig.js").getDb();
var user = db.collection("user"); /* ### Teacher collection  ### */
var stud = db.collection("student"); /* ### student collection  ### */

var general = require("../general.js");
var ObjectId = require("mongodb").ObjectID;

module.exports.getAllClass = function (req, res) {
    console.log("getAllClass-->");
    var responseData;
    stud.find().toArray(function (err, studentList) {
      if (err) {
        responseData = {
          status: false,
          message: "Failed to get Data",
          data: data
        };
        res.status(400).send(responseData);
      } else {

        console.log("studentList: "+JSON.stringify(studentList));
        console.log("studentList.length: "+studentList.length);

        // responseData = {
        //   status: true,
        //   message: "Successfull retrived data",
        //   data: listOfUser
        // };
  
        // res.status(200).send(responseData);
      }
    });
  
    console.log("<--getAllClass");
  };