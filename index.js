const io = require('socket.io')({
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  
  io.listen(8000);
  

const users={};

io.on('connection',socket=>{  //listens to the users joining to the chat
    socket.on('new-user-joined',name=>{  //it deals with the connections
            console.log("new user",name);
            users[socket.id]= name ;
            socket.broadcast.emit('user-joined',name);//it notifys the other users that new user jooined  
                
    });
    socket.on('send',message=>{ //when anyone sends message this works we can use any name instead of sesnd
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect',message=>{ //when anyone sends message this works we can use any name instead of sesnd
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})


  