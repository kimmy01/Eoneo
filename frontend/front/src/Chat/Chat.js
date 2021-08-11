import React, { useEffect, useRef, useState } from "react";
import {useRecoilState } from "recoil";
import ScrollToBottom from "react-scroll-to-bottom";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {
    myUidState,
    opponentUidState,
    roomSeqState,
    opponentdataState,
    chatroomsState,
  } from "../State/State";



//css
import "./Chat.css";
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios'
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom';


// 실제 응답표

// subscribe.response
    // chatRoomId: "24ad750d-fea7-4f61-8cbd-b01891002141"
    // message: "i send"
    // receiveUserUId: "1824ad750d-fea7-4f61-8cbd-b018910021413075kz60mfg"
    // sendUserId: 2
    // sendUserUId: "224ad750d-fea7-4f61-8cbd-b01891002141u9s2v14rq0k"

// DBdata: response.data.data.chats[0]
    // 0: {chatMessageId: 7, sendUserId: 16, message: "test"}

// mydata :
    // {id: 53, email: "ssafy29@ssafy.com", username: "ssafy29", firstLogin: 1, userDetail: {…}, …}
    // email: "ssafy29@ssafy.com"
    // firstLogin: 1
    // id: 53
    // joindate: "2021-08-05T14:23:10"
    // topicList: (3) [{…}, {…}, {…}]
    // userDetail: {id: 53, nationality: {…}, gender: 1, nickname: "닉네임", description: "설명", …}
    // userLanguage: {fluentLanguage: {…}, nativeLanguage: {…}, wantLanguage: {…}}
    // username: "ssafy29"

//chatroom data
    // data:
    // chatRoomList: Array(2)
    // 0:
    // chatRoomId: "0d1422a6-83cb-49fe-be9b-0edca23039a3"
    // imagePath: "C:\\Users\\multicampus\\KimNayeong\\SubPJT3-EONEO\\backend\\profileimages\\202108055320210805.png"
    // unReadCount: 0
    // user1Id: 53
    // user1Name: "ssafy29"
    // user1UId: "53lofuvhz5aho"
    // user2Id: 47
    // user2Name: "ssafy25"
    // user2UId: "47l6q9o6i4c3k"

/////////////////////////////////////////

const Chat = () => {
    // localstorage
    const client = useRef({});
    const jwttoken = 'Bearer '+localStorage.getItem('token')
    const my_id = localStorage.getItem('user_id')

    // usestate
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [mydata,setMydata] = useState({})

    //recoildata
    const [chatrooms, setChatrooms] =useRecoilState(chatroomsState)
    const [opponentdata,setOpponentdata] = useRecoilState(opponentdataState)
    const [RoomSeq,setRoomSeq] = useRecoilState(roomSeqState) 
    const [myUid,setMyUid] =  useRecoilState( myUidState)
    const [opponentUid,setOpponentUid] = useRecoilState(opponentUidState)

    useEffect(() => {
        connect()
        getMyData()
    }, []);

    useEffect(() => {
        getChatroomList()
    }, [mydata])

    useEffect(() => {
            getDBdata()
            // readMessage()
    }, [RoomSeq])

    // websocket 연결
    const connect = () => {
        client.current = new StompJs.Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/chatEonoe-websocket"), // proxy를 통한 접속 //internet explore
        connectHeaders: {
            "Authorization": jwttoken,
        },
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
        client.current.subscribe('/subscribe/'+myUid+'/queue/message', ({ body }) => {
            setChatMessages((chatMessages) => [...chatMessages, JSON.parse(body)]);
        });
    };
    
    //메시지 전송
    const publish = (message) => {
        if (!client.current.connected) {
        return;
        }
        let messagesdata = {
            chatRoomId: RoomSeq,
            sendUserId: mydata.id, //
            message: message,
            sendUserUId : myUid,
            receiveUserUId : opponentUid
        };
        
        client.current.publish({
            destination: "/publish/chat/message",
            body : JSON.stringify(messagesdata),
        }
        )

        console.log(JSON.stringify(messagesdata))
        ;
    };

    //공통 인증 헤더
    const config = {
        headers: { "Authorization": jwttoken },
      }
    
    // 내 정보 받기
    const getMyData = () => {
    axios.get(`http://localhost:8080/api/userinfo/${my_id}`,config)
    .then(response => 
        setMydata(response.data))
    .catch((Err) => console.error(Err));
    }

    const getUserData = (userId) => {
        axios.get(`http://localhost:8080/api/userinfo/${userId}`,config)
        .then(response => 
            setOpponentdata(response.data))
        .catch((Err) => console.error(Err));
        }

    // 채팅메시지: 해당채팅방 메시지정보 불러오는 함수
    const getDBdata = () => {
        axios.get(`http://localhost:8080/api/chatroom/room/${RoomSeq}/`,config)
        .then(setChatMessages([]))
        .then(response => 
                {response.data.data.chats.map((chat,chatMessageId) =>
                    setChatMessages((chatMessages) => [...chatMessages,chat]))
                })
        .then(disconnect)
        .then(connect)
        .catch((Err) => console.error(Err));
    }
    
    // 채팅방리스트: 현재 유저의 채팅방 리스트 불러오는 함수
    const getChatroomList = () => {
        // event.preventdefault()
        axios.get(`http://localhost:8080/api/chatroom/rooms/${mydata.id}/`,config)
        // .then(response => console.log(response))
        .then(setChatrooms([]))
        .then(response => 
            {response.data.data.chatRoomList.map((room) =>
                setChatrooms((chatrooms) => [...chatrooms,room]))
            })
        
        .catch((Err) => console.error(Err));
    }

    // 채팅방삭제: 해당 채팅방을 제거하는 함수
    ///////////// 실행안됌: 401에러 ///////////////////////
    const deleteChatroom = (chatRoomId,e) => {
        console.log(chatRoomId)
        console.log(e)
        axios.patch(`http://localhost:8080/api/chatroom/room/${mydata.id}/${chatRoomId}`,{
            headers: { "Authorization": jwttoken }
        })
        .then(response => console.log(response))
        .catch((Err) => console.error(Err));
    }

    // 채팅방 선택: 채팅방을 선택하는 함수
    const selectChatroom = (chatRoomId,user1Id,user1UId,user2Id,user2UId) => {
        setRoomSeq(chatRoomId)
        if (user1Id === mydata.id) {
            getUserData(user2Id)
            setMyUid(user1UId)
            setOpponentUid(user2UId)
        } 
        else {
            getUserData(user1Id)
            setMyUid(user2UId)
            setOpponentUid(user1UId)
        }
    }

    // // DEBUG 함수
    // const confirm = () => {
    //     console.log(count)
    // }

   
    return (
        <div>
            <div id="frame">
                {/* 사이드바 */}
            <div id="sidepanel">
                {/* 1. 왼쪽 상단, 나의 프로필상태 */}
                <div id="profile">
                    <div className="wrap">
                        <img
                        id="profile-img"
                        src={mydata.userDetail?.profile_image}
                        className="online"
                        alt=""
                        />
                        {mydata.username}
                    </div>
                </div>

                <div id="search" />
                {/* 2.왼쪽 중앙, 채팅방 */}
                <div id="contacts">
                <ul>
                    {/* 2-1. 클릭시 활성화(박스 하얀색) */}
                    {chatrooms.map((chatroom,idx) => (
                    <li key={idx} id="list-style"
                        onClick={(e)=>{selectChatroom(chatroom.chatRoomId,chatroom.user1Id,chatroom.user1UId,chatroom.user2Id,chatroom.user2UId)}}
                        // className={
                        //     "contact"
                        // // activechatroom.id && chatroom.id === activechatroom.id
                        // //     ? "contact active"
                        // //     : "contact"
                        // }
                    >

                        {/* 2-2. 안 읽은 메시지 표시하기 */}
                        <div className="wrap">
                            <span className="contact-status"></span>
                            {/* image가 업로드 기준이라 확인이 힘듬  */}
                            <img id={chatroom.chatRoomId} src={chatroom.imagePath} alt="" />
                            <div className="meta">
                                {mydata.username === chatroom.user1Name 
                                ?  <p className="name">{chatroom.user2Name}</p>
                                :  <p className="name">{chatroom.user1Name}</p>
                                }
                            <div>
                                <NoMeetingRoomIcon onClick={(e)=>{deleteChatroom(chatroom.chatRoomId, e)}}/>
                            </div>
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>
                </div>

            </div>

            {/* 중앙메시지 창 */}

            {/* 1. 중앙 왼쪽 상단에 나의 사진과 이름 표기 */}
            <div className="content">
                <div className="contact-profile">
                    <img src={opponentdata?.profileImage} alt="" />
                    <p>{opponentdata.username}</p>
                </div>

                {/* 2. 메시지 배치
                    메시지전송유저 == 나: clsaa:sent(오른쪽배치)
                    메시지전송유저 != 나: class:replies(왼쪽배치)
                */}
                <ScrollToBottom className="messages">
                <ul>
                    {chatMessages.map((msg) => (
                    <li className={msg.sendUserId === mydata.id ? "sent" : "replies"}>
                        {msg.sendUserId !== mydata.id
                        ?(
                            <img src={opponentdata?.profileImage} alt="" />
                        )
                        :(
                            <img src={mydata.userDetail?.profile_image} alt="" />
                        )
                        }
                        <p>{msg.message}</p>
                    </li>
                    ))}
                    
                </ul>
                </ScrollToBottom>

                {/* 3. 메시지 전송창 */}
                <div className="message-input">
                <div className="wrap">
                    <input
                        name="user_input"
                        size="large"
                        placeholder="Write your message..."
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                            publish(message);
                            setMessage("");
                            }
                        }}
                    />
        
                    {/* 4. 메시지 전송버튼 */}
                    <button
                        style={{display:'inline-block', padding:'0px' }}
                        onClick={(event) => {
                            publish(message);
                            setMessage("");
                        }}
                    > <SendIcon/></button>
                </div>
                </div>
            </div>
        </div>
        {/* <button onClick={confirm}>dd</button> */}
    </div>
    )
}

export default Chat;