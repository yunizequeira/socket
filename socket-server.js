// socket-server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // cámbialo a tu dominio si lo necesitas
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado");

  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado");
  });
});

// Endpoint para emitir nuevos datos desde Next.js
app.post("/emit-order", (req, res) => {
  const newOrder = req.body;
  io.emit("nueva_orden", newOrder);
  res.json({ success: true });
});

app.delete("/delete-order", (req, res) => {
  const deletedOrder = req.body;
  io.emit("orden_eliminada", deletedOrder);
  res.json({ success: true });
});

server.listen(4000, () => {
  console.log("🚀 Socket.IO server corriendo");
});
