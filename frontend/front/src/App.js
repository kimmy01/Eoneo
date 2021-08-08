import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

// main
import Home from './Home/Home.js'
import SearchFriends from './SearchFriends/SearchFriends';

import Chat from '../src/Chat/Chat'
import ChatVideo from './Chat/ChatVideo'
import ChatVisual from './Chat/ChatVisual';
import ChatTest from './Chat/ChatTest';

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
          <Route exact path="/searchFriends" component={SearchFriends} />

          {/* chat */}
          <Route exact path="/chat1" component={Chat} />
          <Route exact path="/chat" component={ChatVisual} />
          <Route exact path="/chatTest" component={ChatTest} />
          <Route exact path="/chatvideo" component={ChatVideo} />

          {/* component */}
          <Route exact path="/login" component={ LoginPage } />        
          <Route exact path="/signup" component={ SignupPage } />    
          

        </Switch>
    </Router>
  );
}

export default App;
