const socketio = require("socket.io");

// Setup and use if socket io is to be used for client side
exports.initSocketioServer = function(server){
  const io = socketio(server);
  console.log("Socket IO server initialized");

  io.on('connection',(socket)=>{
    console.log("SOCKETIO: NEW USER CONNECTED");

    socket.on('connect',(msg)=>{ 
      io.emit('message','this is a test message');
    });
    
    socket.on('disconnect',(msg)=>{
      console.log("SOCKETIO: SOME USER disCONNECTED");
    });
  
    socket.on('message',msg =>{
      console.log("SOCKETIO: got message: "+msg);
      io.emit('message', msg);
    });
  });

};
