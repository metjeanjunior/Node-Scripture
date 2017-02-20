const remote = require('electron').remote
const electronScreen = remote.electronScreen;
const main = remote.require('./main.js')
require('./awesomplete.min.js')
// JSON Stuff
// var fs = require("fs");
// var contents = fs.readFileSync("./resources/disBible.json");
// var jsonContent = JSON.parse(contents);
const bookMap = require("./bookMap.js")

let button = document.createElement('button')
button.textContent = 'Show'
let content = document.getElementById('content')
let errDiv = document.getElementById('errDiv')
// let electronScreen = main.electronScreen;
// let electronScreen = main.getScreen();
content.appendChild(button)
populateDataList()

// window.onLoad = () => {
// 	let content = document.getElementById('content')
// 	content.appendChild(button)
// 	populateDataList()
// };



button.addEventListener('click', () => {
	displayVerse()
}, false)

if (!main.hasSecondary())
	processNoSecondary();

// electronScreen.on('display-added', () => {
//     button.disabled = false;
// })
//
// electronScreen.on('display-removed', () => {
//     if (!main.hasSecondary())
// 		processNoSecondary()
// })

function processNoSecondary()
{
	button.disabled = true;
	errDiv.textContent = "No Secondary Display Has Been Detected!"
}

console.log(Object.keys(bookMap.bookMap))

function displayVerse()
{
	let book = document.getElementById('book').value;
	let chapter = document.getElementById('chapter').value;
	let verse = document.getElementById('verse').value;

	let bookId = bookMap.bookMap[book]
	let verseID = ("0" + bookId).slice(-2) + ("0" + chapter).slice(-3) + ("0" + verse).slice(-3)
}

function populateDataList() {
	var bookElm = document.getElementById('book')
	var awesomplete = new Awesomplete(bookElm, {
		minChars: 1,
		autoFirst: true,
		maxItems: 10
	});
	awesomplete.list = ["China", "India", "Japan", "Russia", "UK", "USA"];
	awesomplete.list = Object.keys(bookMap.bookMap);
	// for (var book in bookMap.bookMap)
	// {
	// 	awesomplete.list = awesomplete.list.push(book)
	// }
}
