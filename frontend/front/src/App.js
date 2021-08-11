import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	// Link
} from 'react-router-dom';

// main
import Home from './Home/Home.js';
import Main from './Home/Main.js';
import SearchFriends from './SearchFriends/SearchFriends';

// chat
import Chat from '../src/Chat/Chat';
import ChatVideo from './Chat/ChatVideo';

//MyPage
import MyPage from '../src/MyPage/MyPage';
// component
import NavBar from './components/NavBar/NavBar';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';

import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import FormMyPage from './MyPage/FormMyPage';

function App() {
	return (
		<Router>

			<div className="App">
			</div>
			<Switch>
				{/* main */}

				<RecoilRoot>
					<Suspense fallback={<div>Loading...</div>}>
						{/* <Route exact path="/" component={Home} /> */}

						{
							localStorage.getItem('user_id') === null ?
								<div>
									<Route exact path="/" component={Main} />
									<Route exact path="/signup" component={SignupPage} />
								</div>
								:
								<div>
									<NavBar />
									<Route exact path="/searchFriends" component={SearchFriends} />
									{/* chat */}
									<Route exact path="/chat" component={Chat} />
									<Route exact path="/chatvideo" component={ChatVideo} />
									<Route exact path='/mypage' component={MyPage} />
									<Route exact path='/update/user_detail' component={FormMyPage} />
								</div>
						}
						{/* component */}
						{/* <Route exact path="/login" component={ LoginPage } />        
	      <Route exact path="/signup" component={ SignupPage } />     */}

					</Suspense>
				</RecoilRoot>

			</Switch>
		</Router>
	);
}

export default App;
