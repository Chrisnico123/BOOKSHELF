const storagekey = "ADD-BUKU";
const BOOK_ID = "bookid";
let temp = [];
function render(target, judul, penulis, tahun, complate) {
  const tujuan = document.getElementById(target);
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  tr.setAttribute("class", "list");
  tr.innerHTML = `<td> ${judul} </td>`;
  tr.innerHTML += `<td> ${penulis} </td>`;
  tr.innerHTML += `<td> ${tahun} </td>`;
  if (complate === false) {
    td.append(createbuttonselesai(), createbuttonhapus());
  } else {
    td.append(createrefreshbutton(), createbuttonhapus());
  }
  let idbook = +new Date();
  tr.append(td);
  tujuan.appendChild(tr);
  tr[BOOK_ID] = idbook;
  console.log(tujuan);
  adddata(idbook, judul, penulis, tahun, complate);
}

function takeDataBookFromStorage() {
  let data = JSON.parse(localStorage.getItem(storagekey));

  if (data !== null) {
    temp = data;
  }
  document.dispatchEvent(new Event("loaded"));
}

function makeBook(title, author, year, isComplete) {
  const wrapTable = document.createElement("td");
  const row = document.createElement("tr");
  row.setAttribute("class", "list");
  row.innerHTML += `<td > ${title} </td>`;
  row.innerHTML += `<td > ${author} </td>`;
  row.innerHTML += `<td > ${year} </td>`;
  if (isComplete === false) {
    wrapTable.append(createbuttonselesai(), createbuttonhapus());
  } else {
    wrapTable.append(createrefreshbutton(), createbuttonhapus());
  }
  row.append(wrapTable);
  return row;
}

function selesaibutton(event) {
  const pop = confirm("Apakah anda yakin ini sudah selesai?");
  if (pop) {
    const cur = JSON.parse(localStorage.getItem(storagekey));
    for (let user of cur) {
      if (user.id === event[BOOK_ID]) {
        getdata();
        const tujuan = document.getElementById("selesai");
        const tr = makeBook(user.judul, user.penulis, user.tahun, true);
        event.remove();
        const newdata = {
          id: user.id,
          judul: user.judul,
          penulis: user.penulis,
          tahun: user.tahun,
          complete: true,
        };
        const bookPosition = findindex(event[BOOK_ID]);
        temp.splice(bookPosition, 1);
        tujuan.appendChild(tr);
        temp.push(newdata);
        updatedata();
      }
    }
    event.remove();
    alert("Buku Sudah dihapus dari list :)");
  } else {
    return 0;
  }
}
function refreshbutton(event) {
  const pop = confirm("Apakah anda yakin ingin di refresh?");
  if (pop) {
    const tujuan = document.getElementById("belumselesai");
    const cur = JSON.parse(localStorage.getItem(storagekey));
    for (let user of cur) {
      if (user.id === event[BOOK_ID]) {
        getdata();
        const tr = makeBook(user.judul, user.penulis, user.tahun, false);
        tr[BOOK_ID] = user.id;
        event.remove();
        const newdata = {
          id: user.id,
          judul: user.judul,
          penulis: user.penulis,
          tahun: user.tahun,
          complete: false,
        };
        const bookPosition = findindex(event[BOOK_ID]);
        temp.splice(bookPosition, 1);
        tujuan.appendChild(tr);
        temp.push(newdata);
        updatedata();
      }
    }
    event.remove();
    alert("Buku Sudah dihapus dari list :)");
  } else {
    return 0;
  }
}

function hapusBook(event) {
  const pop = confirm("Apakah anda yakin ingin menghapus buku dari list?");
  if (pop) {
    const bookPosition = findindex(event[BOOK_ID]);
    getdata();
    temp.splice(bookPosition, 1);
    event.remove();
    console.log(bookPosition);
    updatedata();
    alert("Buku Sudah dihapus dari list :)");
  } else {
    return 0;
  }
}

function findindex(bookpos) {
  let i = 0;
  for (let user of temp) {
    if (user.id === bookpos) {
      return i;
    }
    i++;
  }
}

function getdata() {
  let data = JSON.parse(localStorage.getItem(storagekey));
  if (data !== null) {
    temp = data;
  }
}

function updatedata() {
  localStorage.setItem(storagekey, JSON.stringify(temp));
}

function adddata(id, judul, penulis, tahun, iscomplete) {
  const newdata = {
    id: id,
    judul: judul,
    penulis: penulis,
    tahun: tahun,
    complete: iscomplete,
  };
  if (typeof Storage !== undefined) {
    getdata();
    if (localStorage.getItem(storagekey) === null) {
      temp = [];
    } else {
      temp = JSON.parse(localStorage.getItem(storagekey));
    }
    temp.push(newdata);
    localStorage.setItem(storagekey, JSON.stringify(temp));
  }
}

function refreshDataFromDataBook() {
  const listBookUncomplete = document.getElementById("belumselesai");
  const listBookComplete = document.getElementById("selesai");
  const data1 = JSON.parse(localStorage.getItem(storagekey));
  for (let user of data1) {
    console.log(user.complete);
    let tr = makeBook(user.judul, user.penulis, user.tahun, user.complete);
    tr[BOOK_ID] = user.id;
    if (user.complete === false) {
      listBookUncomplete.appendChild(tr);
    } else {
      listBookComplete.appendChild(tr);
    }
  }
  console.log(temp);
}
