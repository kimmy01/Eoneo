import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import {
  RecoilRoot,
} from 'recoil';


// main
import Home from './Home/Home.js';
import Main from './Home/Main.js';
import SearchFriends from './SearchFriends/SearchFriends';

// chat
import Chat from '../src/Chat/Chat';

//MyPage
import MyPage from '../src/MyPage/MyPage';
// component
import NavBar from './components/NavBar/NavBar';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';

import React, { Suspense } from 'react';
import FormMyPage from './MyPage/FormMyPage';

import Loader from './Loader';


// chat
export default function App() {
  return (
    <Router>
      <div className="App">
      </div>
      <Switch>

          <RecoilRoot>
            <Suspense fallback={<Loader type="spin" color="#685de2" message={'Please Wait a Second!'}/>}>
            {localStorage.getItem('user_id') === null ?
                <div>
                  <Route exact path="/" component={Main}/>
                  <Route exact path="/signup" component={SignupPage}/>
                </div>
              :
            <div>
              <NavBar />
              <Route exact path="/searchFriends" component={SearchFriends} />
              {/* chat */}
              <Route exact path="/chat" component={Chat} />
			        <Route exact path="/update/user_detail" component={FormMyPage} />
			        <Route exact path="/mypage" component={MyPage} />
			  
            </div>
          }
          {/* component1 */}
          {/* <Route exact path="/login" component={ LoginPage } />        
          <Route exact path="/signup" component={ SignupPage } />     */}
          
          </Suspense>
          </RecoilRoot>

	      </Switch>
    </Router>
  );
}
