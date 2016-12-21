var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

online_person_list = [];

io.on('connection', function(socket){
  //console.log('a user connected');
  
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
	//io.emit('chat_message');
  });
  
   socket.on('send_message', function(msg){
    //console.log('send_message: ' + msg);
	io.emit('chat_message', msg);
  });
  
  socket.on('logged_in', function(msg){
   // console.log('logged_in message: ' + msg);
   online_person_list.push(msg);
	io.emit('show_loggedin', msg);
	io.emit('online_person_list', JSON.stringify(online_person_list));
	
  });
  
  socket.on('need_online_person_list', function(msg){
   
	io.emit('online_person_list', JSON.stringify(online_person_list));
	
  });
  
  
  
  socket.on('notify_typing_event', function(msg){
    //console.log('notify_typing_event message: ' + msg);
	io.emit('is_typing', msg);
  });
  
  socket.on('person_disconnected', function(msg){
    //console.log('notify_typing_event message: ' + msg);
	io.emit('person_disconnected_ack', msg);
  });
  
});

/*http.listen(3000, function(){
  console.log('listening on *:3000');
});*/

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on' + process.env.PORT);
}); 