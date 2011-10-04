//Launching express web framework and socket.io
var app = require('express').createServer();
var io  = require('socket.io').listen(app);

//Setting up the webserver
app.listen(80);

//Routing the index
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/static/index.html');
});

//Routing any other static files
app.get('/static/*', function (req, res) {
  res.sendfile(__dirname + req.url);
});

//WebSockets logic
io.sockets.on('connection', function (socket) {
  socket.on('echo', function (data) {
	socket.emit('echo', {message: data.message});
  });

  socket.on('requestData',function(data){
	socket.emit('deliverData',{problem:'X5XX4XXX;X138XXX64;9XX3XX521;4XXXX9XX6;7XX4X398X;18XX264XX;XXX2XXXX9;8X4XXX63X;X9XXXX1X7',solver: 'sudoku.js'});
  });
});

