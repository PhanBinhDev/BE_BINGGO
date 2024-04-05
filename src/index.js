const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectToDB = require("./config/connectDB.config");
const cookieParser = require("cookie-parser");
const initRoute = require("./api/routes/index.routes");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
connectToDB();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoute(app);
const PORT = process.env.PORT || 8888;
const server = require("http").Server(app);
// const io = require("socket.io")(server);

// // Lưu trữ thông tin người dùng và phòng chat
// const users = {};
// const chatRooms = {};

// io.on("connection", (socket) => {
//   // Sự kiện khi một người dùng tham gia phòng chat
//   socket.on("joinRoom", ({ username, room }) => {
//     // Lưu thông tin người dùng và phòng chat
//     socket.username = username;
//     socket.room = room;
//     users[socket.id] = username;

//     // Tham gia phòng chat
//     socket.join(room);

//     // Gửi thông báo cho người dùng đã tham gia phòng chat
//     socket.emit("message", {
//       username: "System",
//       text: `Welcome to the chat, ${username}!`,
//     });

//     // Gửi thông báo cho các người dùng khác trong phòng chat
//     socket.broadcast.to(room).emit("message", {
//       username: "System",
//       text: `${username} has joined the chat.`,
//     });
//   });

//   // Sự kiện khi một người dùng gửi tin nhắn
//   socket.on("sendMessage", (message) => {
//     // Lấy thông tin người dùng và phòng chat
//     const { username, room } = socket;

//     // Gửi tin nhắn đến tất cả người dùng trong phòng chat
//     io.to(room).emit("message", { username, text: message });
//   });

//   // Sự kiện khi một người dùng rời khỏi phòng chat
//   socket.on("disconnect", () => {
//     // Lấy thông tin người dùng và phòng chat
//     const { username, room } = socket;

//     // Xóa thông tin người dùng
//     delete users[socket.id];

//     // Gửi thông báo cho các người dùng khác trong phòng chat
//     socket.broadcast.to(room).emit("message", {
//       username: "System",
//       text: `${username} has left the chat.`,
//     });
//   });
// });

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
