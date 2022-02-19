function tambahbuku() {
  document.getElementById("button-plus").addEventListener("click", () => {
    document.getElementById("add-data").toggleAttribute("hidden");
    document.getElementById("tag").classList.toggle("tag");
  });
}
function createbuttonselesai() {
  const button = document.createElement("button");
  button.classList.add("btn-selesai");
  button.innerHTML = "Selesai";
  button.addEventListener("click", (event) => {
    selesaibutton(event.target.parentElement.parentElement);
    event.stopPropagation();
  });
  return button;
}

function createbuttonhapus() {
  const button = document.createElement("button");
  button.classList.add("btn-hapus");
  button.innerHTML = "Hapus";
  button.addEventListener("click", (event) => {
    hapusBook(event.target.parentElement.parentElement);
    event.stopPropagation();
  });
  return button;
}

function createrefreshbutton() {
  const button = document.createElement("button");
  button.classList.add("btn-refresh");
  button.innerHTML = "Ulangi";
  button.addEventListener("click", (event) => {
    refreshbutton(event.target.parentElement.parentElement);
    event.stopPropagation();
  });
  return button;
}

function addbuku() {
  document.getElementById("form").addEventListener("submit", (event) => {
    const pop = confirm("Apakah anda yakin ingin memasukan ke Rak ? ");
    if (pop) {
      event.preventDefault();
      const judul = document.getElementById("judul").value;
      const penulis = document.getElementById("penulis").value;
      const tahun = document.getElementById("tahun").value;
      const checkBook = document.getElementById("check").checked;
      if (checkBook === true) {
        render("selesai", judul, penulis, tahun, true);
      } else {
        render("belumselesai", judul, penulis, tahun, false);
      }
    } else {
      return 0;
    }
  });
}

function search() {
  var input = document.querySelector("#search");
  input.addEventListener("keyup", (e) => {
    const cari = e.target.value.toLowerCase();
    let itemlist = document.querySelectorAll(".list");

    for (let user of itemlist) {
      const data = user.children[0].textContent.toLowerCase();
      if (data.indexOf(cari) != -1) {
        user.style.display = "";
      } else {
        user.style.display = "none";
      }
    }
  });
}
