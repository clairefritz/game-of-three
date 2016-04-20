const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const io = require('socket.io').listen(server);

app.set('port', '3000');
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('connected to socket', socket);

});

server.listen(app.get('port'), function(){
  console.log('Listening on port %d', app.get('port'));
});