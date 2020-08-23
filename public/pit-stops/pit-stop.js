table = document.getElementById("table")
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("table").innerHTML =
    this.responseText;
  }
};
xhttp.open("GET", "../pit_stop_info.txt", true);
xhttp.send()

function subscribe(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    }
  };
  xhttp.open("GET", "/pit-stop-subscribe", true);
  xhttp.send()
}
