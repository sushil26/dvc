var id = localStorage.getItem("id");
var schoolName = localStorage.getItem("schoolName");
console.log("studSchoolId: "+id+" schoolName: "+schoolName);

function attendance(){
    window.location.href = "https://norecruits.com/#!dashboard/attendanceView/"+id;    
}
function result(){
    window.open(
        "https://norecruits.com/#!dashboard/automationResultView/"+id,
        '_blank' // <- This is what makes it open in a new window.
      );
    // window.location.href = "https://norecruits.com/#!dashboard/automationResultView/"+id;    
}