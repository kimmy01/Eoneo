//react
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import ScrollToBottom from 'react-scroll-to-bottom';
import {
	myUidState,
	opponentUidState,
	roomSeqState,
	opponentdataState,
	user1IdState,
	user2IdState,
	user1UIdState,
	user2UIdState,
} from '../state/state';
import * as StompJs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

// import Stomp from 'webstomp-client';
// import SockJS from 'sockjs-client';

//css
import './Chat.css';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom';
import { Badge } from '@material-ui/core';
import ModalCompontet from '../Openvidu/ModalComponent';

function Chat() {
	// localstorage
	const client = useRef({});
	const jwttoken = 'Bearer ' + localStorage.getItem('token');
	const my_id = localStorage.getItem('user_id');

	// usestate
	const [chatMessages, setChatMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [mydata, setMydata] = useState({});
	const [selectChatroomId, setSelectChatroomId] = useState('');
	const [chatrooms, setChatrooms] = useState([]);
	// const [opponentData, setOpponentData] = useState({});
	// const [opponentName, setOpponentName] = useState({});

	//recoildata
	const [RoomSeq, setRoomSeq] = useRecoilState(roomSeqState);
	const [opponentdata, setOpponentdata] = useState({});
	const [myUid, setMyUid] = useRecoilState(myUidState);
	const [opponentUid, setOpponentUid] = useRecoilState(opponentUidState);

	// recoil only get
	const [user1Id, setUser1Id] = useRecoilState(user1IdState);
	const [user2Id, setUser2Id] = useRecoilState(user2IdState);
	const [user1UId, setUser1UId] = useRecoilState(user1UIdState);
	const [user2UId, setUser2UId] = useRecoilState(user2UIdState);

	useEffect(() => {
		getMyData();
		setRoomSeq(RoomSeq);
		selectChatroom(RoomSeq, user1Id, user1UId, user2Id, user2UId);
		getChatroomList();
		connect();
	}, []);

	useEffect(() => {
		getDBdata();
	}, [RoomSeq]);
	//공통 인증 헤더
	const config = {
		headers: { Authorization: jwttoken },
	};

	// websocket 연결
	const connect = () => {
		client.current = new StompJs.Client({
			brokerURL: 'wss://api/chatEonoe-websocket',
			// webSocketFactory: () => new SockJS("/chatEonoe-websocket"), // proxy를 통한 접속 //internet explore
			// webSocketFactory: () => new SockJS('/api/chatEonoe-websocket'),
			connectHeaders: { Authorization: jwttoken },
			debug: function (str) {
				console.log(str);
			},
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			onConnect: () => {
				subscribe();
			},
			onStompError: (frame) => {
				console.error(frame);
			},
		});
		client.current.activate();
	};

	const disconnect = () => {
		client.current.deactivate();
	};

	// 메시지 구독
	const subscribe = () => {
		client.current.subscribe(
			'/subscribe/' + myUid + '/queue/message',
			({ body }) => {
				setChatMessages((chatMessages) => [...chatMessages, JSON.parse(body)]);
			}
		);
	};

	//메시지 전송
	const publish = (message) => {
		if (!client.current.connected) {
			return;
		}
		let messagesdata = {
			chatRoomId: RoomSeq,
			sendUserId: mydata.id,
			message: message,
			sendUserUId: myUid,
			receiveUserUId: opponentUid,
		};

		client.current.publish({
			destination: '/publish/chat/message',
			body: JSON.stringify(messagesdata),
		});
	};

	// 내 정보 받기
	const getMyData = async () => {
		await axios
			.get(`/api/userinfo/${my_id}`, config)
			.then((response) => setMydata(response.data))
			// console.log(1,response))
			.catch((Err) => console.error(Err));
	};

	const getUserData = async (userId) => {
		await axios
			.get(`/api/userinfo/${userId}`, config)
			.then((response) => {
				setOpponentdata(response.data);
			})
			.catch((Err) => console.error(Err));
	};

	// 채팅메시지: 해당채팅방 메시지정보 불러오는 함수
	const getDBdata = async () => {
		await axios
			.get(`/api/chatroom/room/${RoomSeq}/`, config)
			.then(setChatMessages([]))
			.then((response) => {
				response.data.data.chats.map((chat, chatMessageId) =>
					setChatMessages((chatMessages) => [...chatMessages, chat])
				);
			})
			.then(disconnect)
			.then(connect)
			.catch((Err) => console.error(Err));
	};

	// 채팅방리스트: 현재 유저의 채팅방 리스트 불러오는 함수
	const getChatroomList = async () => {
		await axios
			.get(`/api/chatroom/rooms/` + my_id, config)

			.then(setChatrooms([]))
			.then((response) => {
				setChatrooms(response.data.data.chatRoomList);
			})

			.catch((Err) => console.error(Err));
	};

	// 채팅방삭제: 해당 채팅방을 제거하는 함수
	const deleteChatroom = async (chatRoomId, e) => {
		let data = {
			roomId: chatRoomId,
			userId: my_id,
		};
		console.log(data);
		await axios
			.put('/api/chatroom/room', data, config)
			.then(() => getChatroomList())
			.catch((Err) => console.error(Err));
	};

	// 채팅방 선택: 채팅방을 선택하는 함수
	const selectChatroom = async (
		chatRoomId,
		user1Id,
		user1UId,
		user2Id,
		user2UId
		// user1Name,
		// user2Name,
		// opponentUserData
	) => {
		setRoomSeq(chatRoomId);
		// setOpponentData(opponentUserData);
		if (user1Id === parseInt(my_id)) {
			console.log(mydata.id);
			console.log('2', user2Id);
			getUserData(user2Id);
			// setOpponentName(user2Name);
			setMyUid(user1UId);
			setOpponentUid(user2UId);
		} else {
			console.log(my_id);
			console.log('1', user1Id);
			// setOpponentName(user1Name);
			getUserData(user1Id);
			setMyUid(user2UId);
			setOpponentUid(user1UId);
		}
		setSelectChatroomId(chatRoomId);
	};

	return (
		<div>
			<div id='frame'>
				{/* 사이드바 */}
				<div id='sidepanel'>
					{/* 1. 왼쪽 상단, 나의 프로필상태 */}
					<div id='profile'>
						<div className='wrap'>
							<p>Chats</p>
						</div>
					</div>

					{/* 2.왼쪽 중앙, 채팅방 */}
					<div id='contacts'>
						<ul style={{ paddingLeft: 0 }}>
							{chatrooms.map((chatroom, idx) => (
								<li
									key={idx}
									id='list-style'
									onClick={(e) => {
										selectChatroom(
											chatroom.chatRoomId,
											chatroom.user1Id,
											chatroom.user1UId,
											chatroom.user2Id,
											chatroom.user2UId
											// chatroom.user1Name,
											// chatroom.user2Name,
											// chatroom?.userDetail
										);
									}}
									className={
										chatroom.chatRoomId &&
										chatroom.chatRoomId === selectChatroomId
											? 'contact active'
											: 'contact'
									}>
									<div className='wrap' style={{ marginTop: 5, width: '100%' }}>
										<Badge
											style={{ float: 'left' }}
											overlap='circle'
											anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
											badgeContent={
												<img
													id='profileflag'
													src={chatroom.userDetail?.nationality?.flag}
													alt=''
												/>
											}>
											<img
												id='profileimg'
												src={
													'/static/img/' + chatroom.userDetail?.profile_image
												}
												alt=''
											/>
											{/* #123
                                            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgSFRUYGBgYGBkYGRgZGBEYGBgZGBgZGRgZGRgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISGDQhJCE0MTE0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NDE0NDQ0NDQ0NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAABAgADBAUGB//EADwQAAEDAQYDBQYEBQQDAAAAAAEAAhEhAwQSMUFRBWFxIoGRobEGMkLB0fATYnLhUoKy0vEUM5LTFaLC/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAgEQEBAAIDAAMBAQEAAAAAAAAAAQIREiExA0FRIoEz/9oADAMBAAIRAxEAPwDuhqYNTAIgLaFwohqcBEBAoamhMGpgECQmDUwCjjCAYUCuRxXjP4cBjQ87TC4V54y95EnDNIrn1SRdL+OcUfiIY8gCgA3nVcdnHbw33ojckAjrX5Km0twHPcTOEmOoFD8+9ZXuDiCcz7oArlU/f1Vakdp3tNaYaNaTvDvQQsZ9pryMgTzwj0JWX8E+8ThA2jwlLasExU98NHU5kqLJHd4d7ZOkNtmfzAeoXr7nfGWjQ5pkHLn0Xyx725BhPOKeatuvEH2Rlpw6kaHqAhcZfH1mFMK4HA+PMtQBirFRIkdNwvRNIIkKOdlhMKmFWQpCCqEMKuhCEFOFAtVxCUhBUWoFqshAhUV4VIVkIQgSFE6iCsBEBSEQgMIgKBMEAATAKBGVACvNe0vEHNLbNhqczyXo3HOv0Xzfit6FrbOtM2A4WD+KPijZIuMaWVEl1eUSs15bOTgRzJlZ4kZwNpNO+fSFjeK0cT1nykrVrci910LoAO817lqs7rhNM4AnlsNlnuzCDMd8LQ21JNaeOXVZ23Z0j7MDrpJ89gs7g7QeBB8Tmrr08ZDLWZErn2rzo3vqPOibSRXaMfNSR980rIyxQd6+aIvThRwp4jxS2zGuEjw1HTcJtrS6ze9hDmuqMiDVe79l+P4x+G89vwxDcfm3C+aB7mn7grddrxEEHmCDBB0IKJljuPtDHg5IwvP+z3FfxWAky4UdlIP5m/Nd6ztQUcLNGhSEyBCBCECE5CUhAhCCchCECEJSFYggWFEYUQJCkJoUhAAEQEQEzUAhSE4CiDje0ltgu9oQYJAaP5jB8pXzi6MLiaU1PLYcvVet9u75RliDU9t3dIaPVedubMIjap3+/wB0ldcZ/KPyjwb0zJ76dyqs6nLrSn7lC3tZcWjP4j8h0yWy4XYugnuS5abxxtXXewmBHitdpdCBkuhdLvC221gD4LlydOMeStbs7eOlPNZX3U6fuvU2lwVZuQA1TlVmMeNtrsRuD1KyYiHQaHQjI8iN17S3uQjJcTiHDwWkgVFYVmRcfxx3iRIpuNjy5FIymXf+ytwwZzBHiCle2FvbFjs8B4gbG1baA09140LSa/VfU2EEBwyNQV8Ys3r6V7JcSx2QY7NlOcBVy+TH7ejaU0pWpijkCBCYoEIFIQKYhKgVCExQQBRFRAkIqBGEEhFoRATAIJCjskQg/Lqg+X+09qX3l5PwhrR0ifUqm2f+HZ4tTlzJy8vUq7j7ZvLxu4eQH0XO4pa9tjdGjEfKvms/b0ydRbc7GSBrmeu3dl3L01zsIC4nAGYu0fv7qvUWLIWMr26yai+xbCucVUwKxZClqRzFagUTbK+ylc683bULq21u1uZAXLvPE2ZAE91Eam3lr1dcLnMHN7By+Jvr9lY3NkRtUdF2eKPc6HhhBaZDuWo+9lht7HJ4yNfqFuVLGBq9V7G25a4nSRP34LzTmQetR97r03szhPYp2jkaEbH73W5XLLG6r6PZOkTurYXP4c84cJzFPDJdEI8xYQITwgQgrIQKsISkKishCE5QKBYURUQIEwQATAICAjCicIFDVCFYqrWQDCg+de1DIvGIfEPQkLzHFXVc7oPKF6/2muxDy7YsHSjiR6LyV/bIdyI8pn0Wft68O8XovZtvYHRelsWUkrg+z7Ow0gaQt14s3kmXQNgsV0nbdaXljfiCqbfWnIrlPugHvO8S1aLuxoyM+Ci6jqsfKFoaKuwKutGozXKtrriMmqy2t5sbKhInak/VbeIWhawkZmG0zkmF5+88HcXw2SwmTSpkZOxCTFfFaxxl9S5WeR0f/I2b+wT3GB5ZrFaXfAcPwOy/Kduh+q323DsZbI90AVzMalaXXIYMJyS6njU87eUdZQSPvl0Wmw7LmkGC098T519VbxK7OaQY5ToR9VVdnnE2B2mmncivfcIveOorI8SP8L0DHSJXgOC2zrO1n4T7wPwnszI0NV7y7Gi6PDnjqroQRUKMkKUpygUFZQITlKVQqiKiBAnCUJgggVgVYVgUBSuFCnChCDxvtb7h3LwO4MafkV4i3ZU859V732rs6EnJpDv+TXN9QF4Yio/mH34LOXr1/D3i7/sw7sR/CVo4renMkMaS45R9VR7ImS9vQr1D7k01gSsX1vengL/w572NfiLnycYMwJIiBqBBGpqtPC7k9jZaCCXTDjhbhgUjrPRenfcINAmsrrGa1y61pNSXcoXazXTfdZbKrsmRAXUs29lYZyrhuu4Kr/0gW+3bBVTHJtqbVMuwCj7EKxxSkqNacTi9h2D1EeKzXK4ThcKEunzldfiFnibETVvqE9wupYwudmGmBWQZDRPOq1jLUyymON2zi79v8SPeBxmsEPfR3KB5dF7CwZA7guUy7iXHQNDepwkAf+y7TBRdq8WV2ihCJQWUSEpCZAqhCEpCcpSgRRFRUIEwShMEDAJglCcKAohQIoONxu7Y2vETLPNrsXyjvXzu8XYh+EbnCeVV9WtmSV4zjPD4eIEVLZ6yWHxEeCmU3Hb4c+N05Ps5aFlrhNMTYg75j0PivZtt1417JtAcjhpuHMIP7L0l3tMbQ7x5HVca9dkvba+0lK0qiU7Sm04w2MyANTC6hvjWNwmpXKFmTUaLnXi6PNqLTG8Q3DhDnYDXMtynmjPGV073xBmNrXuaHPkNBIBdFTA1VLDUxoVi/wBKHvD3RiFAdR0XRs7PCIQuohUQlWIbVhvab+oeq1XllWNGrzPQODvkVXdmS8DqfJa3Mm0YNsTvQfNdcPHm+W/02XayoDGs960ItFFFXICgmQKAFBFAqhSlKcpHIFUUUVCBMEoTNQMnCQJgoHRCUIoARK5fFrmHt22OrToe4gHuXWAS2jJBCEeKt7uCWvcIwuGNvkT0gnwaupa2AYcTQA12g0O/etF7uVSY7LqO5ELOyTZhmoIBzkRr0PqCpljt1xzssCFAFGPnqKFMSuPj1b3DseAs1+v7GDc7fVLbkxTNcG14a51bRxdOcUHgo6fHhjcv6qy24xh1A6ESjd/aBzqYHuA1whZ2cMY0jDZim66t2u5piiBkAkerPH45j3I03W8l4xFpbOhifJaw5VtaESYVeCtV0HanZbLEzaDkw+bh/asdyEEg/wAR+/Nbbv74P5B6kLvJqPHld210SihCCjKIFFBBClKYoKhSkITlKUCQoioqKwmCUJggIThIEwUDBMlCIQMFFFFApbVc6+2EAuGh8QY+crpqm8tkEcvr9VSPNW7XNIe3cyN6/JXB0rVbWEz90WMhcvkev4buA4IAKY907XDRYldrFL7E5p7KzVpKGIBE7GFnt36Kx9psqXImnbu1lFdCrbIw+Dq2Ebg6WN6ekq20Z2mu0FD3hejbw3q6amlEpWJ1EIUEVCgCBRQKoBSlEpSgCiiioqCYJAmCBgmCUK11k4AEtIB1IIUACIShEIGlMCkTKAqoiSnKVzgEIxX0Q0nnToVygV07++RC52BcMst17fix44qLQKtW2irKjrtJO6hCgRVKjAo5MxK8Iz9uxwV8tLdRUdCuoGrzlwt8DwdDQ9CvSDcLrjdx5Pmx1lv9BhVhSAplpyAoIqFAqBRKBVClKUXJSgCiiioqC13K5ueaUbqfpuVRdrEvcGj/AANSvQkBga0DKgHfmY+81jLLRIF0uTGVAJO5zHQaLQ8YqUjXIzTyrCym0MAwMsw4AEzJjw80WPiJmg0Jdo0QOa5+taYL9dMHab7s5fwzkFjC6zraZpmYgRlQHESM/uq41raQSDSFrlpccdrQma0lZm3kArp2b2vsyRDSDFKDTTvTkvCz1lfTNZbR+ZGSe2sX7goMst1zttdMcZj459t2lTashdQ3eDIqNvost5ZiMhTTrMnJeFWVqtLNZnNhHSXaBFKEZVDSoFEbMIzQaF1+G3qAGOy0O3Jc3DUQr2BWXTOUmU1XoEy5d2vJbQ1C6TbQESF0mW3kyxuIlCUJQWmRlAoEoEqiFIUS5K4oIohKio3cDaRjfpQep+i3Xl8DETAbOZEVE1nNVXMQxoEUaDO0g18SkvbxgNYgTXOQZmXUGWcrll3Woj3y2sOEkUnUwKkbO01WYPDicLXAnCcz/E50da11qM0LNxIMUq3tdszIiCXDOg55JJdMh4io7UGCCAMuhpuVFXWT3OkAny2/f1XK4pQh0AZgwdicPktIvj5cHZTE5ULhADhTI0Hmq72AbMgYcqamQZ1RcbrJzDaLo8ItcWOzPxN9P8rjyr7ha4bRh0xQejqfNZnr0Wbxp/8AXuGqYcRKq4hd4tHt0mR0dX5rIbEppZxsdA3yVW+86rGGFEMKaNRqdbSqbQSoxqswKaWMhs1Axa/wlCxF5M4anayE+FR1AibRuauaqGyEwcrpK1NYtF1gOiT2sxpksbSVdZEhzP1D1VjnlOmlz6kc1MSqe7tHqfVJiS1JGkOVjSFi/EUFopteLcQFmtJFQlFotN3u2KrqN6VP0HNWJdT1m/HO3mouj+DZ7N/5fuotbrH8toeKtzgNEb4QOVdEto4AdoxXJuhzJp81HOAeI0zyzIw5xU5DdI0ZdkzpIg0oThdl3mVGGW64u02ow0g457Lhq6mpqO7JUB7GxQiuYIFT2yQdiczrMJyQHua6CHSQMb3OqAAS3IVReXTQnn7pMkQIVi1lsg0vM6tE0OQLaSMqd6dzGgCNZ69oyY2Ub79YPZ/MPig9fvvoxkOgzkKjI1OXzRXMLYOE6GPBO0IX8w87GD9+CFm5Yr0zuSuxxNkuY/8Aibn0qPVKywBTlhNg0nNppn7oJE+BCexNFa5TzX4qddQkddQtqUhRduc+wUDFtcFTEGN0XagsSuYtLgq3BF2oLFW5q0kJGM1KLsgYmFmrQxNhVZ2RjExFWnZzfUJw1I/Nv6m+oQR7qmdz6oFB57bv1H1Sues1ZEcUpKU2i6NzusQ92eYFKcyJSGVmM7GwuuGHvr+Xbr9Ebzakmkwc/wB6o2zyehygUP3SpVYcT8OURP715brpI4XK0uF2334qJsDvy+Dfqoqjp2j2tIOW5xNBNTNJ5+cKu0eYOMhrSMuoMmPi/wAoXoQGkgEzJO3QkQOp7qoYCZcRmBXtCuxOZGWigzF7Q9pbmTBlxZlBoJz7YHhog+7CaSKgfDHZl0gA6EnmdaJbcukktDQMJaRAOoiuQo3vT2r8WVZB0GRNC06UBr4IqlrC17ZMHDFXEScTZp3pXOE1FP3dVK6jmTlBGgGhEA/pojasz1iY7vsoOTxh3aaR08K/NG4WeNwboKuqBTlzScXJIZGZfAG8g/Rdfht2DGRWTEmDn8gpx3XXnrCfrsWD2UBIiMOGdOncsVrZ4HFumY6K+7XYCJz29VdfLE4dJGX0CtjljdVjBQJQaUSFh0ISqXqxyrcixXjSFyV9K+KhKLBccgrWhUsE1V7QqGAURhKUELlRbO9R5EJ3FZrcyCN6eKEhrR0PePzHzr81mt7XRG/vw2z29D5R8lku7Da2gs26ySdgMys10xnW7+Ovwq7F5/EcOyN9T9F1XHetSda5kZHyRYA0ANEACAKaUqqLzZtoS0TRrXHETLuzIFdCVuTTzZZcqUua85Hm6GkbRB3kjlVO2zgUIIpnnIHM677pmWWBga0Njao6CNKU5JHEDcU0POSd8wDXcqxk+PmPA/VBYfx/y+Y/uUQdZ/wfqb6K1mQ6f3qKIn05PEPcf0HoFLxn/KPRyKiNTxXe/dH38Dkbvn4eiCiJfGG++9Z/rd/Q9de55KKKxcvHQu/xdVDmPvZRRRlhbr1KLlFFh2I9UOUURYotMlWMlFEai2zVzVFFUpilcoogqcqrP32frb/UFFEGDjH++79P/wBOWj2T/wB60/QP60FE+3S/8/8AHp35n70CS/afzf0qKK144qvmY/V/1rK73O4ehUUVi/TGoooiv//Z" /> */}
										</Badge>

										<div className='meta'>
											{mydata.username === chatroom.user1Name ? (
												<p className='name' style={{ display: 'inline-block' }}>
													{chatroom.user2Name}
												</p>
											) : (
												<p className='name' style={{ display: 'inline-block' }}>
													{chatroom.user1Name}
												</p>
											)}

											<div
												style={{
													display: 'inline-block',
													float: 'right',
													marginRight: 20,
												}}>
												{chatroom.chatRoomId &&
												chatroom.chatRoomId === selectChatroomId ? (
													<NoMeetingRoomIcon
														onClick={(e) => {
															deleteChatroom(chatroom.chatRoomId, e);
														}}
													/>
												) : (
													<p></p>
												)}
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
				{/* 중앙메시지 창 */}

				{/* 1. 중앙 왼쪽 상단에 상대의 사진과 이름 표기 */}
				<div className='content'>
					<div className='contact-profile'>
						<div style={{ height: 30 }}>
							{/* <img src= */}
							{/* #123
                                      "data:image/jpeg;base64,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" /> */}
							<img
								src={'/static/img/' + opponentdata?.userDetail?.profile_image}
							/>
							<p className='contact-profilename'>{opponentdata.username}</p>
							<div style={{ float: 'right', marginTop: 10 }}>
								<ModalCompontet />
							</div>
						</div>

						<div class='chatlanguagebox'>
							<p id='chatnativelanguage'>
								{' '}
								{opponentdata?.userLanguage?.nativeLanguage?.language}
							</p>
							<p id='chatfluentlanguage'>
								{' '}
								{opponentdata?.userLanguage?.fluentLanguage?.language}
							</p>
							<p id='chatwantlanguage'>
								{' '}
								{opponentdata?.userLanguage?.wantLanguage?.language}
							</p>
						</div>
					</div>

					{/* 2. 메시지 배치
                    메시지전송유저 == 나: clsaa:sent(오른쪽배치)
                    메시지전송유저 != 나: class:replies(왼쪽배치)
                */}
					<ScrollToBottom className='messages' style={{ height: '100' }}>
						<ul style={{ paddingLeft: 0 }}>
							{chatMessages.map((msg) => (
								<li
									style={{ paddingRight: 10 }}
									className={msg.sendUserId === mydata.id ? 'sent' : 'replies'}>
									{msg.sendUserId !== mydata.id ? (
										<img
											src={
												'/static/img/' + opponentdata.userDetail?.profile_image
											}
											alt=''
										/>
									) : (
										<img
											src={'/static/img/' + mydata?.userDetail?.profile_image}
											alt=''
										/>
									)}
									<p>{msg.message}</p>
								</li>
							))}
						</ul>
					</ScrollToBottom>

					{/* 3. 메시지 전송창 */}
					<div className='message-input'>
						<div className='wrap'>
							<input
								name='user_input'
								size='large'
								placeholder='Write your message...'
								value={message}
								onChange={(event) => setMessage(event.target.value)}
								onKeyPress={(event) => {
									if (event.key === 'Enter') {
										publish(message);
										setMessage('');
									}
								}}
							/>
						</div>

						{/* 4. 메시지 전송버튼 */}
						<button
							id='chat-message-button'
							style={{ display: 'inline-block' }}
							onClick={(event) => {
								publish(message);
								setMessage('');
							}}>
							{' '}
							<SendIcon />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;
