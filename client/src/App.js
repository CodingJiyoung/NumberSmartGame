import "./App.css";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import Room from "./Room";
import ScrollToBottom from "react-scroll-to-bottom";
import Game from "./game/Game";

function App() {
  const [socketObj, setSocketObj] = useState({});

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);

  React.useEffect(() => {
    const socket = io.connect("http://localhost:5000");

    socket.on("message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });

    setSocketObj(socket);
  }, []);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socketObj.emit("join_room", username, room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <>
          <h1>hello team!</h1>
          <h2>Game Rules</h2>
          <div>
            <ol>
              <li>Enter your name and find your room ID</li>
              <li>Click the button to join a room</li>
              {/* DONE */}
              <li>When you are ready, click generate game button</li>
              {/* DONE */}
              <li>
                If you click generate game button then random numbers and math
                operators on 5 x 5 grid table will appear
              </li>
              {/* DONE */}
              <li>
                You need to remember the numbers and operators in 10 seconds
              </li>
              {/* DONE */}
              <li>
                After 10 seconds, random number will disappear and alphabet grid
                will appear
              </li>
              {/* DONE */}
              <li>
                <strong>!REMEMBER THE RANDOM NUMBER!</strong>
              </li>
              <li>
                type your name in the chat to guess your matching alphabet
              </li>
              <li>
                chat will be paused while the player is guessing and will show
                the random number or math operators based on your chosen
                alphabet
              </li>
              <li>
                Type the alphabet that can make a random number using numbers
                and math operators
              </li>
              <li>
                if you find a matching number and math operators then you won!
              </li>
            </ol>
          </div>
          <input
            type="text"
            placeholder="your name"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="room ID"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                joinRoom();
              }
            }}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button type="button" onClick={joinRoom}>
            Join a Room
          </button>
        </>
      ) : (
        <>
          <Game socket={socketObj} username={username} room={room} />
          <Chat
            socket={socketObj}
            username={username}
            room={room}
            messages={messages}
          />
        </>
      )}
    </div>
  );
}

export default App;