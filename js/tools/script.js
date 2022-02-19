window.addEventListener("DOMContentLoaded", () => {
  tambahbuku();
  addbuku();
  search();
  takeDataBookFromStorage();
});
document.addEventListener("loaded", () => {
  refreshDataFromDataBook();
});
