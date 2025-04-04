import React, { useContext } from 'react';
import AppContext from './context/appContext';
import { Avatar } from '@material-ui/core';
import './Chat.css';

function Chat() {
  const { currentRoom, messages } = useContext(AppContext);

  return (
    <div className="chat">
      {currentRoom ? (
        <>
          <div className="chat__header">
            <Avatar />
            <div className="chat__headerInfo">
              <h3>{currentRoom.data.name}</h3>
              <p>Last seen at...</p>
            </div>
          </div>
          <div className="chat__body">
            {messages.map(message => (
              <div key={message.id} className="chat__message">
                <span className="chat__name">{message.data.user}</span>
                {message.data.message}
                <span className="chat__timestamp">
                  {new Date(message.data.timestamp?.toDate()).toUTCString()}
                </span>
              </div>
            ))}
          </div>
          <ChatInput />
        </>
      ) : (
        <div className="chat__placeholder">
          <h2>Select a chat to start messaging</h2>
        </div>
      )}
    </div>
  );
}

export default Chat;