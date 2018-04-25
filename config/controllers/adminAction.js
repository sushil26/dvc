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
var allClass=[];
        // console.log("studentList: "+JSON.stringify(studentList));
        console.log("studentList.length: "+studentList.length);
        for(var len=0;len<studentList.length;len++){
            var cls = studentList[len].cs[0].class;
            console.log("cls: "+cls);
            allClass.push(cls);

        }

        responseData = {
          status: true,
          message: "Successfull retrived data",
          data: allClass
        };
  
        res.status(200).send(responseData);
      }
    });
  
    console.log("<--getAllClass");
  };