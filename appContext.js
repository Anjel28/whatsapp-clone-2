import React, {  useState, useEffect } from 'react';
import db from '../firebase';
import firebase from 'firebase/app'; 
import 'firebase/firestore';  
import { auth } from '../firebase';  
import AppContext from './context/appContext';


export const AppProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  // रूम्स फेच करना (Fetch rooms)
  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });
    return () => unsubscribe();
  }, []);

  // मैसेजेस फेच करना (Fetch messages)
  useEffect(() => {
    if (currentRoom) {
      const unsubscribe = db.collection('rooms')
        .doc(currentRoom.id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })));
        });
      return () => unsubscribe();
    }
  }, [currentRoom]);

  // नया रूम क्रिएट करना (Create new room)
  const addRoom = async (roomName) => {
    await db.collection('rooms').add({
      name: roomName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  // मैसेज भेजना (Send message)
  const sendMessage = async (message) => {
    if (currentRoom && message.trim() !== '') {
      await db.collection('rooms')
        .doc(currentRoom.id)
        .collection('messages')
        .add({
          message: message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: auth.currentUser.displayName,
          userImage: auth.currentUser.photoURL
        });
    }
  };

  // रूम डिलीट करना (Delete room)
  const deleteRoom = async (roomId) => {
    await db.collection('rooms').doc(roomId).delete();
    setCurrentRoom(null);
  };

  // रूम अपडेट करना (Update room)
  const updateRoom = async (roomId, newName) => {
    await db.collection('rooms').doc(roomId).update({
      name: newName
    });
  };

  return (
    <AppContext.Provider value={{
      rooms,
      currentRoom,
      setCurrentRoom,
      messages,
      addRoom,
      sendMessage,
      deleteRoom,
      updateRoom
    }}>
      {children}
    </AppContext.Provider>
  );
};