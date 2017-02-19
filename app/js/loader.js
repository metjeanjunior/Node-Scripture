var myVar;

function showLoader() {
	myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("content").style.display = "block";
  document.body.classList.add("loaded");
}
