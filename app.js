var app = require('http').createServer(response);
var fs = require('fs');
var io = require('socket.io')(app);

app.listen(process.env.PORT || 5000)
console.log("App running…");

function response(req, res) {
    var file = "";
    if (req.url == "/") {
        file = __dirname + '/index.html';
    } else {
        file = __dirname + req.url;
    }
    fs.readFile(file, function(err, data) {
        if (err) {
            res.writeHead(404);
            return res.end('Page or file not found');
        }
        res.writeHead(200);
        res.end(data);
    });
}

io.on("connection", function(socket) {
    socket.on("colorSwap", function(status, callback) {
        if (status == "red"){
            status = "blue";
        }else if (status == "blue"){
            status = "red";
        }
        io.sockets.emit("executeChange", status);
        callback();
    });
});