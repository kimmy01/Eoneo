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

        </Switch>
    </Router>
  );
}

export default App;
