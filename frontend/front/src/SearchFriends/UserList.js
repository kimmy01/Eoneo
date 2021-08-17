import React from 'react';
import './userlist.css';
import { useRecoilState } from 'recoil';
import {
	getUserListState,
	userIdState,
	user1IdState,
	user1UIdState,
	user2IdState,
	user2UIdState,
	roomSeqState,
} from '../state/state.js';
import { Badge } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function UserList() {
	let history = useHistory();
	const [userList] = useRecoilState(getUserListState);
	const [myId] = useRecoilState(userIdState);
	// const [roomData , setRoomData] = useRecoilState(roomDataState);
	const [user1Id, setUser1Id] = useRecoilState(user1IdState);
	const [user1UId, setUser1UId] = useRecoilState(user1UIdState);
	const [user2Id, setUser2Id] = useRecoilState(user2IdState);
	const [user2UId, setUser2UId] = useRecoilState(user2UIdState);
	const [RoomSeq, setRoomSeq] = useRecoilState(roomSeqState);

	// const [RoomSeq2, setRoomSeq2] = useState("test");
	const jwttoken = 'Bearer ' + localStorage.getItem('token');

	const clickHandler = (params, e) => {
		const Uid1 = (Math.random().toString(36).substr(2, 11))
		const Uid2 = (Math.random().toString(36).substr(2, 11))
		setUser1UId(Uid1);
		setUser2UId(Uid2);
		// setUser2Id(params);

		const roomData = {
			user1Id: myId,
			user1UId: Uid1,
			user2Id: params,
			user2UId: Uid2,
		};

		axios
			.post('/api/chatroom/create', roomData, {
				headers: { Authorization: jwttoken },
			})
			.then((response) => {
				console.log(response)
				setUser1Id(response.data.data.user1Id);
				setUser2Id(response.data.data.user2Id);
				setUser1UId(response.data.data.user1UId);
				setUser2UId(response.data.data.user2UId);
				setRoomSeq(response.data.data.chatRoomId);
				setRoomSeq(response.data.data.chatRoomId, history.push('/chat'));
			})
			.catch((err) => console.log(err));
	};

	return (
		<div class='userlistDiv'>
			{userList.map((user, id) => (
				<div
					class='profilebox'
					onClick={(e) => {
						clickHandler(user.id);
					}}>
					<div class='image'>
						<Badge
							overlap='circle'
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							badgeContent={
								<img
									ID= "UserListFlag"
									src={user.userDetail?.nationality?.flag}
									width='40px'
									alt='flag'
								/>
							}>
							<img
								class='profileImage'
								src={'/static/img/' + user.userDetail?.profile_image}
								alt='profile'
							/>
						</Badge>
					</div>
					<div class='textlayer'>
						<div>
							<p id='nickname'>{user.userDetail?.nickname}</p>
							<p id='username'>{user.username}</p>
							<p id='desc'>{user.userDetail?.description}</p>
						</div>
						<div class='language'>
							<p id='want'>{user.userLanguage.wantLanguage.language}</p>
							<p id='fluent'>{user.userLanguage.fluentLanguage.language}</p>
							<p id='native'>{user.userLanguage.nativeLanguage.language}</p>
						</div>
					</div>
					
					<p id="explain">Are you chat with {user.userDetail?.nickname}?</p>
					
				</div>
			))}
		</div>
	);
}

export default UserList;
