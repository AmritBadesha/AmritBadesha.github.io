function showForm() {
  var x = document.getElementById("myForm");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("btn1").disabled = true;
  } else {
    x.style.display = "none";
  }

}
var n = localStorage.getItem('on_load_counter');
if (n === null) {
  n = 0;
}

var storedData = localStorage.getItem("artists");
if (storedData) {
  ArrayData = JSON.parse(storedData);
}
function loadData() {
  //localStorage.clear();

  if (n !== null) {
    var arrayLength = ArrayData.length - 1;
    for(var i = 0; i < arrayLength; i++) {
      var div = document.createElement('div');
      div.setAttribute('class', 'content');
      div.setAttribute('id', ArrayData[i+3]);
      document.body.appendChild(div);
    
      var x = document.createElement("IMG");
      x.setAttribute("src", ArrayData[i+2]);
      x.setAttribute('class', n);
      div.appendChild(x);
    
      var div2 = document.createElement('div');
      div2.setAttribute('class', 'artistName');
      div2.textContent = ArrayData[i];
      div.appendChild(div2);
    
      var div3 = document.createElement('div');
      div3.setAttribute('class', 'artistSchool');
      div3.textContent = ArrayData[i+1];
      div2.appendChild(div3);
    
      var btn = document.createElement("button");
      btn.setAttribute('class', 'deleteBtn');
      btn.setAttribute('onclick', 'deleteDiv(' + ArrayData[i+3] + ')');
      btn.innerHTML = 'Delete';
      div3.appendChild(btn);
      i+=3;
    }
  }
}
var artistArray = []

function addToArray(artistName) {
  artistArray.push(artistName);
  n++;
  if (n === 1) {
    var x = artistArray;
  } else {
    if (n === 2) {
      var storedData = localStorage.getItem("artists");
      if (storedData) {
        ArrayData = JSON.parse(storedData);
        var x = ArrayData.concat(artistArray);
        x.pop;
      }
    }
    var x = artistArray.concat(ArrayData);
  }
  localStorage.setItem("artists", JSON.stringify(x));
  localStorage.setItem("on_load_counter", n);
}

var counter = 0;
function addToDirectory() {
  var artistName = document.getElementById("artistName").value;
  var aboutArtist = document.getElementById("aboutArist").value;
  var imageURL = document.getElementById("imgURL").value;

  addToArray(artistName);
  addToArray(aboutArtist);
  addToArray(imageURL);
  addToArray(n / 4);

  var div = document.createElement('div');
  div.setAttribute('class', 'content');
  div.setAttribute('id', n / 4);
  document.body.appendChild(div);

  var x = document.createElement("IMG");
  x.setAttribute("src", imageURL);
  x.setAttribute('class', n);
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
  btn.setAttribute('onclick', 'deleteDiv(' + n/4 + ')');
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
  delFromArray(todel);
}
function delFromArray(artistName) {
  console.log("Before", ArrayData);
  for(var i = 0; i < ArrayData.length; i++) {
    if(ArrayData[i] === artistName) {
      var n = i;
    }
  }
  var spliceVar = n - 3;
  ArrayData.splice(spliceVar, 4);
  localStorage.setItem("artists", JSON.stringify(ArrayData));
  console.log(ArrayData);
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
