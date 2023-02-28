import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./App.css";

const Chat = ({ socket, username, room, messages }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage.trim() !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessageList((list) => [...list, message]);
    });
  }, [socket]);

  return (
    <div className="container">
      <h1>Matching Number Smart Game</h1>
      <h2>Game Rule</h2>
      <div className="chat">
        <div className="chat-header">
          <p>Live Chat</p>
          <ScrollToBottom className="messages">
            <div>
              {messages.map((msg) => {
                return <h2>{msg.text}</h2>;
              })}
            </div>
          </ScrollToBottom>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="scroll-to-bottom">
            {messageList.map((messageContent, index) => {
              return (
                <div
                  key={`msg_list_${index}`}
                  className="message"
                  id={username === messageContent.author ? "me" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-time">
                      <p key = "1" id="time">{messageContent.time}</p>
                      <p key = "2" id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            key="3"
            type="text"
            placeholder="Type a message"
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;