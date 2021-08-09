import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import React, {Suspense} from 'react';
import {RecoilRoot} from 'recoil';

// main
import Home from './Home/Home.js'
import SearchFriends from './SearchFriends/SearchFriendsNY';

// chat
import Chat from '../src/Chat/Chat'
import ChatVideo from './Chat/ChatVideo'

// component
import NavBar from './components/NavBar/NavBar'
import LoginPage from './components/LoginPage/LoginPage'
import SignupPage from './components/SignupPage/SignupPage'

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
      </div>
      <Switch>
          {/* main */}
          <Route exact path="/" component={Home} />
          <RecoilRoot>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/searchFriends" component={SearchFriends} />
          </Suspense>
          </RecoilRoot>

          {/* chat */}
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/chatvideo" component={ChatVideo} />

          {/* component */}
          <Route exact path="/login" component={ LoginPage } />        
          <Route exact path="/signup" component={ SignupPage } />    
          

        </Switch>
    </Router>
  );
}

export default App;
