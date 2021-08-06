import './App.css';
import Home from './Home/Home.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import NavBar from './components/NavBar/NavBar'
import LoginPage from './components/LoginPage/LoginPage'
import SignupPage from './components/SignupPage/SignupPage'
import CategoryPage from './Home/CategoryPage';
import Chat from '../src/Chat/Chat'
import VideoChat from '../src/Chat/VideoChat'
import ChatVisual from './Chat/ChatVisual';
import ChatTest from './Chat/ChatTest';


function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
      </div>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/main" component={CategoryPage} />
          <Route exact path="/login" component={ LoginPage } />        
          <Route exact path="/signup" component={ SignupPage } />       
          <Route exact path="/chat1" component={Chat} />
          <Route exact path="/videochat" component={VideoChat} />
          <Route exact path="/chat" component={ChatVisual} />
          <Route exact path="/chatTest" component={ChatTest} />
          

        </Switch>
    </Router>
  );
}

export default App;
