var email = localStorage.getItem('careatorEmail');
    
$.ajax({
  url: "https://norecruits.com/chatHistory/getHistoryByEmailId/" + email,
  type: "GET",
  contentType: "application/json",
  dataType: "json",
  success: function (data) {
    console.log("data: " + JSON.stringify(data));
    console.log("data.data.length: "+data.data[0].length);
    //window.location.href = "https://norecruits.com/careator/" + id + "/" + date;
  },
  error: function (err) {
    console.log("err: " + JSON.stringify(err));
    console.log("err.responseText: " + JSON.stringify(err.responseText));
    console.log("err.responseJSON: " + JSON.stringify(err.responseJSON.message));
  }
});