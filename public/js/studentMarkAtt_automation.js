var studSchoolId = localStorage.getItem("studSchoolId");
var schoolName = localStorage.getItem("schoolName");
console.log("studSchoolId: "+studSchoolId+" schoolName: "+schoolName);

function attendance(){
    window.location.href = "https://norecruits.com/#!dashboard/attendanceView/"+schoolName+"/"+studSchoolId;    
}
function result(){
    window.location.href = "https://norecruits.com/#!dashboard/automationResultView/"+schoolName+"/"+id;    
}