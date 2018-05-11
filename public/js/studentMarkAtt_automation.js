var id = localStorage.getItem("id");
var schoolName = localStorage.getItem("schoolName");
console.log("studSchoolId: "+id+" schoolName: "+schoolName);

function attendance(){
    window.location.href = "https://norecruits.com/#!dashboard/attendanceView/"+id;    
}
function result(){
    window.location.href = "https://norecruits.com/#!dashboard/automationResultView/"+id;    
}