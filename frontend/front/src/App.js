import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React, { Suspense } from 'react';
import {
  RecoilRoot,
} from 'recoil';

// css
import './App.css';

// main
import SearchFriends from './SearchFriends/SearchFriends';

// chat
import Chat from '../src/Chat/Chat';

//MyPage
import MyPage from '../src/MyPage/MyPage';
import FormMyPage from './MyPage/FormMyPage';

// component
import NavBar from './components/NavBar/NavBar';
import SignupPage from './components/SignupPage/SignupPage';
import Loader from './Loader';


// chat
function App() {
  return (
    <Router>
      <Switch>
          <RecoilRoot>
            <Suspense fallback={<Loader type="spin" color="#685de2" message={'Please Wait a Second!'}/>}>
            {localStorage.getItem('user_id') === null ?
                <div>
                  <Route exact path="/signup" component={SignupPage}/>
                </div>
                :
              <div>
                <NavBar />
                <Route exact path="/" component={SearchFriends} />
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


export default App;
