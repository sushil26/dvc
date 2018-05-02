var user = require('./controllers/user');
var event = require('./controllers/event');
var image = require('./controllers/image');
var adminAction = require('./controllers/adminAction');
var school = require('./controllers/school');


module.exports = function (app) {

    app.post('/vc/register4VC', user.register4VC);
    app.post('/vc/login4VC', user.login4VC);
    app.get('/vc/getUserData', user.getUserData);
    app.get('/vc/getStudData', user.getStudData);
    app.post('/vc/updateUserStatus', user.updateUserStatus);
    app.post('/vc/updateStudStatus', user.updateStudStatus);
    app.post('/vc/deleteUser', user.deleteUser);
    app.post('/vc/deleteStud', user.deleteStud);
    app.post('/vc/emailInvite', user.emailInvite);
    app.post('/vc/sessionCreate', user.sessionCreate);
    app.post('/vc/teacherInsert', user.teacherInsert);
    app.post('/vc/studentInsert', user.studentInsert);
    app.get('/vc/teacherDetail/:id', user.teacherDetail);
    app.get('/vc/studentDetail/:id', user.studentDetail);
    app.get('/vc/teacherPersonalData/:id', user.teacherPersonalData);
    app.get('/vc/studentPersonalData/:id', user.studentPersonalData);
    app.get('/vc/getLoginData/:id', user.getLoginData);
    app.post('/vc/adminCreate', user.adminCreate);
    app.get('/vc/getAllClass/:schoolName', school.getAllClass);
    app.get('/vc/getSchoolList', school.getSchoolList);
    app.post('/vc/uploadClassFile/:schoolName', adminAction.uploadClassFile);
    app.post('/vc/uploadStudentMaster/:schoolName/:clas/:section', adminAction.uploadStudentMaster);
    app.post('/vc/uploadTeacherMaster/:schoolName', adminAction.uploadTeacherMaster);
    // app.post('/vc/uploadMark', adminAction.uploadMark);
    app.post('/vc/uploadAttendance/:schoolName/:clas/:section/:reportType/:month', adminAction.uploadAttendance);

    //  app.post('/vc/uploadPayment', adminAction.uploadPayment);

    // app.post('/vc/atte', adminAction.getAllClass);

    app.get('/vc/getStudListForCS/:clas/:section', event.getStudListForCS);
    app.get('/vc/getTeacherListForCS/:clas/:section', event.getTeacherListForCS);
    app.post('/vc/eventSend', event.eventSend);
    app.post('/vc/eventReSchedule/:id', event.eventReSchedule);
    app.get('/vc/getToDate', event.getToDate);
    app.get('/vc/eventGet/:id', event.eventGet);
    app.get('/vc/getEventById/:id', event.getEventById);
    app.post('/vc/deleteEvent', event.deleteEvent);
    app.post('/vc/parentCredential', event.parentCredential);
    app.post('/vc/eventUpdate/:id', event.eventUpdate);





    // app.get('/vc/teacherGet/:id', event.teacherGet);

}