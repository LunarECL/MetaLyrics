var songs = [];

document.getElementById("lyrics").addEventListener("click", () => {
  toggleDropdown();
});

function toggleDropdown() {
  if (document.getElementById("myDropdown").classList.contains("show")) {
    document.getElementById("myDropdown").classList.remove("show");
  }
}

addEventListener("load", (event) => load());

async function load() {
  const data = await window.MetaAPI.getFirst();
  console.log(data);
  songs = data;

  var first = songs[0];

  document.getElementById("lyrics").innerHTML = first["data"].replaceAll(
    "\n",
    "<br>"
  );
  document.title = first["title"];

  for (var i in songs) {
    var a = document.createElement("a");
    a.href = "#" + songs[i]["title"];
    a.innerHTML = songs[i]["title"];

    a.onclick = function () {
      for (var i in songs) {
        if (songs[i]["title"] === this.innerHTML) {
          document.getElementById("lyrics").innerHTML = songs[i][
            "data"
          ].replaceAll("\n", "<br>");
          document.title = songs[i]["title"];
          toggleDropdown();

          break;
        }
      }
    };

    document.getElementById("myDropdown").appendChild(a);
  }
}

function drop() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase().normalize("NFC");
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (Hangul.search(txtValue.toUpperCase().normalize("NFC"), filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
