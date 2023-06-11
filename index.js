const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIo(server);

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/game',(req,res) =>{
  res.sendFile(__dirname + '/game.html');
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const shuffle=()=>{
  let player;
  player = 2;

  const hands = new Array(player);
  const community = new Array(5);
  
  let random;
      let flag;
      const randoms = new Array(player * 2 + 5);
      for (i = 0; i < player * 2 + 5; i++) {
          flag = 1;
          random = Math.floor(Math.random() * 52);
          for (j = 0; j < i; j++) {
              if (random === randoms[j]) {
                  i--;
                  flag = 0;
                  break;
              }
          }
          if (flag) randoms[i] = random;
      }
      for (i = 0; i < 5; i++) {
          community[i] = {sort: ~~(randoms[i] / 13), rank: randoms[i] % 13 + 1};
      }
      for (i = 0; i < player; i++) {
          hands[i] = [
              {sort: ~~(randoms[i*2 + 5] / 13), rank: randoms[i*2 + 5] % 13 + 1},
              {sort: ~~(randoms[i*2 + 6] / 13), rank: randoms[i*2 + 6] % 13 + 1}
          ];
      }
};
 
const n=shuffle();
const test='渡せました';

io.on('connection', (socket,test) => {
    console.log('connected');
    socket.on('sendId', (id) => {
      console.log('id has sent:',id);
      socket.join(id);
      socket.on('sendMessage', (message) => {
        console.log('Message has been sent on room: ', message);
        io.to(id).emit('receiveMessage', test);
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });      
    });    
});