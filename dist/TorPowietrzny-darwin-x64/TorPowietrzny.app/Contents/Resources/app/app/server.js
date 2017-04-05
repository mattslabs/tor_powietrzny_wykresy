var express = require('express');

var ess = express();

var server = ess.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Waiting for device at http://' + host + ':' + port);
}

ess.use(express.static('public'));

var io = require('socket.io')(server);

io.sockets.on('connection',
  function (socket) {
  
    console.log("Device has connected:" + socket.id);
  
    socket.on('connection',
      function(data) {
        console.log(data.distance);
        socket.broadcast.emit('connection', data.distance);

      }
    );
    
    socket.on('disconnect', function() {
      console.log("Device has disconnected");
    });
  }
);



