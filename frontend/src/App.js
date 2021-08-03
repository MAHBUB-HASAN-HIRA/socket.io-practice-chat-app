import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

//no dotenv here
const socket = io("http://localhost:4020");
const userName = nanoid(5);

function App() {
	const [message, setMessage] = useState("");
	const [chats, setChat] = useState([]);
	const sendChat = (e) => {
		e.preventDefault();
		socket.emit("chat", { message, userName });
		setMessage("");
	};
	useEffect(() => {
		socket.on("chats", (payload) => {
			setChat([...chats, payload]);
		});
	});
	console.log(chats);

	return (
		<div className="App">
			<header className="App-header">
				<h1>My First Chat App With Socket.io</h1>
				<div>
					{chats.map((chat, index) => {
						return (
							<p key={index}><span> {chat.userName}:</span> {chat.message} </p>
						);
					})}
				</div>
				<div>
					<form onSubmit={sendChat}>
						<input
							type="text"
							name="chat"
							id="chat"
							placeholder="type message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button type="submit"> Send Message</button>
					</form>
				</div>
			</header>
		</div>
	);
}

export default App;
