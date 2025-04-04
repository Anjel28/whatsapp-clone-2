import React, { useContext, useState } from 'react';
import AppContext from './context/appContext';


import { Avatar } from '@material-ui/core';

function SidebarChat({ room, onClick }) {
  const { deleteRoom, updateRoom } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(room.data.name);

  const handleUpdate = () => {
    updateRoom(room.id, newName);
    setIsEditing(false);
  };

  return (
    <div className="sidebarChat" onClick={onClick}>
      <Avatar />
      <div className="sidebarChat__info">
        {isEditing ? (
          <div>
            <input 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <>
            <h3>{room.data.name}</h3>
            <p>Last message...</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteRoom(room.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default SidebarChat;