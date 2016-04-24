const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));
app.set('port', '3000');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var gameId = 0;
  var room = "game" + gameId;

  socket.on('new user', function(number){
    // add the users into a room
    // the room can only have two users
    if (typeof socket.adapter.rooms[room] === 'undefined') {
      socket.join(room);
      socket.adapter.rooms[room].number = number;
      socket.emit('new game', number);
    } else if (socket.adapter.rooms[room].length < 2) {
      socket.join(room);
      socket.emit('new game', socket.adapter.rooms[room].number);
    } else {
      // TODO: create a new room when the previous room is full
    }
  });

  // catch the move event and send it to all sockets in the room
  socket.on('move', function(number){
    io.sockets.emit('move', number);
  });

  // leave the room upon disconnect
  socket.on('disconnect', function(){
    socket.leave(socket.room);
  });
});

server.listen(app.get('port'), function(){
  console.log('Listening on port %d', app.get('port'));
});