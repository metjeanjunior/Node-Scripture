const http = require('http')
const hostname = '127.0.0.1';
const port = 9090;

const server = http.createServer((req, res) => {
	var POST = {};
   if (req.method == 'POST') {
	   req.on('data', function(data) {
		   data = data.toString();
		   data = data.split('&');
		   for (var i = 0; i < data.length; i++) {
			   var _data = data[i].split("=");
			   POST[_data[0]] = _data[1];
		   }
		text = POST["text"];
		verse = POST["verse"];
		console.log(JSON.stringify(POST))
	   })
   }
	console.log(JSON.stringify(verse));
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World\n');
});

server.listen(port, hostname, () => {
	console.log(`Second display Server running at http://${hostname}:${port}/`);
});

let verse = "empty"
let text = "empty too"
