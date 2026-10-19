
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const path = require('path')
const io = new Server(server)

app.use(express.static(path.join(__dirname,'..')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..','index.html'))
})

const users = {}

io.on('connection', (socket) => {
  socket.on('new-joined-user', (name) => {
    console.log('New user:', name)

    users[socket.id] = name

    socket.broadcast.emit('joined-user', name)
  })

  socket.on('send', (message) => {
    socket.broadcast.emit('receive', {
      message: message,
      name: users[socket.id]
    })
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('left', users[socket.id])
    delete users[socket.id]
  })
})

server.listen(3000, () => {
  console.log('Server running on port 3000')
})

/*const io = require('socket.io')(3000)

const users = {};

io.on('connection', socket =>{
  socket.on('new-joined-user',name =>{
    console.log("new user ", name)
    users[socket.id] = name;
    socket.broadcast.emit('joined-user',name)
  })

  socket.on('send',massage =>{
    socket.broadcast.emit('receive',{massage : massage, name: user[socket.id]})
  })
})*/