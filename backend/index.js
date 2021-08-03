const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
	cors: { origin: "*" },
});

io.on("connection", (socket) => {
	// console.log("What is socket socket :", socket);
	console.log("socket is connected");

	socket.on("chat", (payload) => {
		console.log("What is payload", payload);
		io.emit("chats", payload);
	});
});

// app.listen(4020, () => console.log("server is listening at port 4020"));
server.listen(4020, () => {
	console.log("server is running with socket at 4020");
});
