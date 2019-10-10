function showForm() {
  var x = document.getElementById("myForm");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("btn1").disabled = true;
  } else {
    x.style.display = "none";
  }

}
var counter = 0;
function addToDirectory() {
  var artistName = document.getElementById("artistName").value;
  var aboutArtist = document.getElementById("aboutArist").value;
  var imageURL = document.getElementById("imgURL").value;

  var div = document.createElement('div');
  div.setAttribute('class', 'content');
  div.setAttribute('id', counter);
  document.body.appendChild(div);

  var x = document.createElement("IMG");
  x.setAttribute("src", imageURL);
  div.appendChild(x);

  var div2 = document.createElement('div');
  div2.setAttribute('class', 'artistName');
  div2.textContent = artistName;
  div.appendChild(div2);

  var div3 = document.createElement('div');
  div3.setAttribute('class', 'artistSchool');
  div3.textContent = aboutArtist;
  div2.appendChild(div3);

  var btn = document.createElement("button");
  btn.setAttribute('class', 'deleteBtn');
  btn.setAttribute('onclick', 'deleteDiv(' + counter + ')');
  btn.innerHTML = 'Delete';
  div3.appendChild(btn);

  document.getElementById("myForm").style.display = "none";
  document.getElementById("btn1").disabled = false;
 
  document.getElementById("myForm").reset();

  counter++;
}
function deleteDiv(todel) {
  var z = document.getElementById(todel);
  z.style.display = "none";
}