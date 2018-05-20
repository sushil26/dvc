var id = localStorage.getItem("id");
var schoolName = localStorage.getItem("schoolName");
console.log("studSchoolId: " + id + " schoolName: " + schoolName);

function momVC() {
    console.log("momVC-->");
    var mom = document.getElementById("momtext").value;
    console.log("mom:" + mom);
    if (localStorage.getItem("teacherLoginId")) {
        var teacherLoginId = localStorage.getItem("teacherLoginId");
        console.log("teacherLoginId: " + teacherLoginId);
    }
    else if (localStorage.getItem("studLoginId")) {
        var studLoginId = localStorage.getItem("studLoginId");
        console.log("studLoginId: " + studLoginId);
    }
    console.log("<--momVC");
}
function attendance() {
    window.open(
        "https://norecruits.com/#!dashboard/automationAttendanceView/" + id,
        '_blank' // <- This is what makes it open in a new window.
    );

}
function result() {
    window.open(
        "https://norecruits.com/#!dashboard/automationResultView/" + id,
        '_blank' // <- This is what makes it open in a new window.
    );
    // window.location.href = "https://norecruits.com/#!dashboard/automationResultView/"+id;    
}