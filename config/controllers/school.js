
var db = require("../dbConfig.js").getDb();
var school = db.collection("school"); /* ### school collection  ### */

var general = require("../general.js");
var ObjectId = require("mongodb").ObjectID;
var bodyParser = require('body-parser');
module.exports.getAllClass = function (req, res) {
    console.log("getAllClass-->");
    var responseData;
    school.find({"schoolName":req.params.schoolName}).toArray(function (err, data) {
        console.log("data: "+JSON.stringify(data));
        if (err) {
            responseData = {
                status: false,
                message: "Failed to get Data",
                data: data
            };
            res.status(400).send(responseData);
        } else {
            if(data.length>0){
                
           
            allClass=data.cs;
            // console.log("studentList: "+JSON.stringify(studentList));
            console.log("csList.length: " + csList.length);
            // for (var len = 0; len < csList.length; len++) {
            //     var cls = studentList[len].cs[0].class;
            //     var sec = studentList[len].cs[0].section;
            //     console.log("cls: " + cls);
            //     allClass.push({ "class": cls, "section": sec });
            // }

            responseData = {
                status: true,
                message: "Successfull retrived data",
                data: allClass
            };

            res.status(200).send(responseData);
        }
        else{
            responseData = {
                status: false,
                message: "There is no class"                
            };

            res.status(200).send(responseData);
        }
        }
    });

    console.log("<--getAllClass");
};