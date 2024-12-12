const http = require("http");
const socketIo = require("socket.io");
const app = require("./app");

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log(`New client connected with ID: ${socket.id}`);
  socket.on("message", (data) => {
    console.log(`Message from client ${socket.id}: ${data}`);
  });
  socket.on("disconnect", () => {
    console.log(`Client with ID: ${socket.id} disconnected`);
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { io };
