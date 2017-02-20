const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 9090;

const verse = document.getElementById('verse')
const text = document.getElementById('text')

app.listen(port, hostname);

app.get('/', (req, res) => {
	verse.textContent = req.query.verse
	text.textContent = req.query.text
})
