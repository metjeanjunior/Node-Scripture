const remote = require('electron').remote
const main = remote.require('./main.js')

// JSON Stuff
var fs = require("fs");
var contents = fs.readFileSync("./resources/t_kjv.json");
var jsonContent = JSON.parse(contents);
console.log("stuff", jsonContent.resultset);

let button = document.createElement('button')
button.textContent = 'Show'
let content = document.getElementById('content')
let errDiv = document.getElementById('errDiv')
// let electronScreen = main.electronScreen;
let electronScreen = main.getScreen();
// document.body.appendChild(button)
content.appendChild(button)
errDiv.textContent =

window.onLoad = () => {
	let content = document.getElementById('content')
	content.appendChild(button)
	errDiv.textContent = results
};

// let submitButton = document.getElementById('submitButton')

button.addEventListener('click', () => {
	main.openWindow()
}, false)

if (!main.hasSecondary())
	processNoSecondary();

electronScreen.on('display-added', () => {
    button.disabled = false;
})

electronScreen.on('display-removed', () => {
    if (!main.hasSecondary())
		processNoSecondary()
})

function processNoSecondary()
{
	button.disabled = true;
	errDiv.textContent = "No Secondary Display Has Been Detected!"
}
