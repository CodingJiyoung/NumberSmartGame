import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function Room() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // handle socket events
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('users', (data) => {
      setUsers(data);
    });

    // emit socket events
    socket.emit('join_room', );

    return () => {
      socket.emit('leaveRoom', { roomId: 'room1' });
    };
  }, []);

  return (
    <div>
      <h1>Room 1</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Room;