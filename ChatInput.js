import React, { useState, useContext } from 'react';
import AppContext from './context/appContext';
import { IconButton } from '@material-ui/core';
import { InsertEmoticon, Mic } from '@material-ui/icons';

function ChatInput() {
  const [input, setInput] = useState('');
  const { sendMessage } = useContext(AppContext);

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="chat__footer">
      <InsertEmoticon />
      <form onSubmit={handleSend}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          type="text"
        />
        <button type="submit">Send</button>
      </form>
      <Mic />
    </div>
  );
}

export default ChatInput;