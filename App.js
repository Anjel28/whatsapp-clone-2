import React from 'react';
import './App.css';
// Change your import statement to match the correct path
import Sidebar from './components/Components/Sidebar'; // or the correct path
import Chat from './components/Chat';
import AppContext from './context/appContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import { auth } from './firebase';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  return (
    <div className="app">
      <AppProvider>
        <Router>
          {!user ? (
            <Login />
          ) : (
            <div className="app__body">
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
            </div>
          )}
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
