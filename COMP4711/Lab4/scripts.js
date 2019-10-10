function showForm() {
  var x = document.getElementById("myForm");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("btn1").disabled = true;
  } else {
    x.style.display = "none";
  }

}
function loadData() {
  if (localStorage.getItem != null) {
    var data = localStorage.getItem('items');
    var dataSplit = JSON.parse(data);
    for (var i = 0; i < dataSplit.length/3; i++) {
      var imageURL = dataSplit[i];
      var artistName = dataSplit[i + 1];
      var aboutArtist = dataSplit[i + 2];

      var div = document.createElement('div');
      div.setAttribute('class', 'content');
      div.setAttribute('id', counter);
      document.body.appendChild(div);

      var x = document.createElement("IMG");
      x.setAttribute("src", imageURL);
      x.setAttribute('class', counter);
      div.appendChild(x);
      saveData(imageURL);

      var div2 = document.createElement('div');
      div2.setAttribute('class', 'artistName');
      div2.textContent = artistName;
      div.appendChild(div2);
      saveData(artistName);

      var div3 = document.createElement('div');
      div3.setAttribute('class', 'artistSchool');
      div3.textContent = aboutArtist;
      div2.appendChild(div3);
      saveData(aboutArtist);

      var btn = document.createElement("button");
      btn.setAttribute('class', 'deleteBtn');
      btn.setAttribute('onclick', 'deleteDiv(' + counter + ',\'' + imageURL + '\' )');
      btn.innerHTML = 'Delete';
      div3.appendChild(btn);

      document.getElementById("myForm").style.display = "none";
      document.getElementById("btn1").disabled = false;

      document.getElementById("myForm").reset();

      counter+3;
    }
  }
}
var artistArray = [];
var count = 0;
function saveData(toSave) {
  artistArray[count] = toSave;
  count++;
  localStorage.setItem('items', JSON.stringify(artistArray))
}
function deleteArrayItem(toDel) {
  var z = toDel;
  console.log("z", z);
  for (index = 0; index < artistArray.length; index++) {
    if (artistArray[index] == z) {
      artistArray.splice(index, index + 3);
    }
  }
  localStorage.setItem('items', JSON.stringify(artistArray))


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
  x.setAttribute('class', counter);
  div.appendChild(x);
  saveData(imageURL);

  var div2 = document.createElement('div');
  div2.setAttribute('class', 'artistName');
  div2.textContent = artistName;
  div.appendChild(div2);
  saveData(artistName);

  var div3 = document.createElement('div');
  div3.setAttribute('class', 'artistSchool');
  div3.textContent = aboutArtist;
  div2.appendChild(div3);
  saveData(aboutArtist);

  var btn = document.createElement("button");
  btn.setAttribute('class', 'deleteBtn');
  btn.setAttribute('onclick', 'deleteDiv(' + counter + ',\'' + imageURL + '\' )');
  btn.innerHTML = 'Delete';
  div3.appendChild(btn);

  document.getElementById("myForm").style.display = "none";
  document.getElementById("btn1").disabled = false;

  document.getElementById("myForm").reset();

  counter++;
}
function deleteDiv(todel, URLtoDel) {
  var z = document.getElementById(todel);
  z.style.display = "none";
  deleteArrayItem(URLtoDel);
}
function search() {
  var input = document.getElementById("search");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName('artistName');
  var fullRow = document.getElementsByClassName('content');

  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      nodes[i].style.display = "block";
      fullRow[i].style.display = "block";

    } else {
      nodes[i].style.display = "none";
      fullRow[i].style.display = "none";
    }
  }
}
