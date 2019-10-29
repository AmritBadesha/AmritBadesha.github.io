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
  var artistName = document.getElementByName("artistName").value;
  var aboutArtist = document.getElementByName("aboutArist").value;
  var imageURL = document.getElementByName("imgURL").value;

  var div = document.createElement('div');
  div.setAttribute('id', 'content');
  div.setAttribute('name', counter);
  document.body.appendChild(div);

  var x = document.createElement("img");
  x.setAttribute("src", imageURL);
  div.appendChild(x);

  var div2 = document.createElement('div');
  div2.setAttribute('id', 'artistName');
  div2.textContent = artistName;
  div.appendChild(div2);

  var div3 = document.createElement('div');
  div3.setAttribute('id', 'artistSchool');
  div3.textContent = aboutArtist;
  div2.appendChild(div3);

  var btn = document.createElement("button");
  btn.setAttribute('id', 'deleteBtn');
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