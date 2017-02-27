// loads the http module to create a http server
var http = require ('http');

//configure our http server to respond with Hello Wold to all request
var server = http.createServer(function (request, response){
    response.writeHead(200, {"Constent-Type": "text/plain"});
    response.end ("Hello World!!\n");
});

//Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

//Message on the terminal
console.log ("Server running at http://127.0.0.1:8000/");
