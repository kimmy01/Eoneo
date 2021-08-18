import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './NavBar.css';
import { withRouter } from 'react-router-dom';
import mainlogo from '../../../src/assets/main/mainlogo2.png';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
    roomSeqState
} from "../../state/state";


function NavBar() {
	const [isLogin, setisLogin] = useState(false);
	const [RoomSeq,setRoomSeq] = useRecoilState(roomSeqState)
	let history = useHistory();
	
	useEffect(() => {
		if (localStorage.getItem('token')) {
			setisLogin(true);
		}
	});

	const handlelogout = (props) => {
		localStorage.removeItem('token');
		localStorage.removeItem('user_id');
		localStorage.removeItem('recoil-persist');
	};

	const navChat = () => {
		setRoomSeq("", history.push('/chat'));
	}

	return (
		<div>
			{isLogin === true ? (
				//로그인 된 상태라면,
				<Navbar bg='white'>
					<Container>
						<div className='mynav'>
							<div className='mynavItem'>
								<Nav.Link onClick={navChat}>Chat</Nav.Link>
							</div>
							<div className='mynavItem item2'>
								<Nav.Link className='logo' href='/searchFriends'>
									<img src={mainlogo} alt='mainlogo' width='100px' />
								</Nav.Link>
							</div>
							<div className='mynavItem item3'>
								<Nav.Link href='/mypage'>Mypage</Nav.Link>
								<Nav.Link onClick={handlelogout} href='/'>
									Logout
								</Nav.Link>
							</div>
						</div>
					</Container>
				</Navbar>
			) : (
				//로그인 안된 상태라면,
				<Navbar bg='white'>
					<Container>
						<div className='mynav'>
							<div className='mynavItem'></div>
							<div className='mynavItem item2'>
								<Nav.Link className='logo' href='/'>
									EONEO
								</Nav.Link>
							</div>
							<div className='mynavItem item3'>
								<Nav.Link href='/login'>Login</Nav.Link>
								<Nav.Link href='/signup'>Signup</Nav.Link>
							</div>
						</div>
					</Container>
				</Navbar>
			)}
		</div>
	);
}

export default withRouter(NavBar);
