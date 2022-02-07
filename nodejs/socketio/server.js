const socketServer = require('socket.io').Server;
const { instrument } = require("@socket.io/admin-ui");

const io = new socketServer(3000, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  }
});

instrument(io, {
  auth: false
});

io.on('connection', socket => {
  console.log('connection', socket);
  console.log('socket.id', socket.id);
  console.log('socket.rooms', socket.rooms);

  // either with send()
  socket.send('Hello! I\'m server.');

  // or with emit() and custom event names
  socket.emit('greetings', 'Hey!', { 'ms': 'jane' }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on('message', (data) => {
    console.log(data);
  });

  // handle the event sent with socket.emit()
  socket.on('salutations', (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });

  // handle the event sent with socket.emit()
  socket.on('client-action', ({ clientTime }) => {
    console.log('client-action', Date.now());
    console.log('clientTime', clientTime);
    const serverTime = Date.now();
    console.log('server-action', Date.now());
    console.log('serverTime', serverTime);
    socket.emit('server-action', { serverTime })
  });

  socket.on('disconnect', (reason) => {
    // ...
    console.log('disconnect', { reason });
  });
});

io.of('/s2').on('connection', socket => {
  console.log('connection2', socket);
  console.log('socket.id', socket.id);
  console.log('socket.rooms', socket.rooms);

  // either with send()
  socket.send('Hello! I\'m server.');

  // or with emit() and custom event names
  socket.emit('greetings', 'Hey!', { 'ms': 'jane' }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on('message', (data) => {
    console.log(data);
  });

  // handle the event sent with socket.emit()
  socket.on('salutations', (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });

  // handle the event sent with socket.emit()
  socket.on('client-action', ({ clientTime }) => {
    console.log('client-action', Date.now());
    console.log('clientTime', clientTime);
    const serverTime = Date.now();
    console.log('server-action', Date.now());
    console.log('serverTime', serverTime);
    socket.emit('server-action', { serverTime })
  });

  socket.on('disconnect', (reason) => {
    // ...
    console.log('disconnect', { reason });
  });
});
