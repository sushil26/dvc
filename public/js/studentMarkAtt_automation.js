var id = localStorage.getItem("studSchoolId");
var schoolName = localStorage.getItem("schoolName");
console.log("studSchoolId: "+studSchoolId+" schoolName: "+schoolName);

function attendance(){
    window.location.href = "https://norecruits.com/#!dashboard/attendanceView/"+id;    
}
function result(){
    window.location.href = "https://norecruits.com/#!dashboard/automationResultView/"+id;    
}