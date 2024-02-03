const http = require('http')
const fs = require('fs')

const PORT = 8081

fs.readFile('branch-and-bound.html', function(error, html){
	if (error) throw error;
	http.createServer(function(request, response){
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	}).listen(PORT)
});