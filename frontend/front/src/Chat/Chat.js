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
  } from "../state/state";
import ChatVideo from "./ChatVideo"

//css
import "./Chat.css";
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios'
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom';

import {user2UIdState} from '../SearchFriends/state.js';

function Chat() {

const [user2UId] = useRecoilState(user2UIdState);

console.log(user2UId);

// const Chat = () => {
    // localstorage
    const client = useRef({});
    const jwttoken = 'Bearer '+localStorage.getItem('token')
    const my_id = localStorage.getItem('user_id')

    // usestate
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [mydata,setMydata] = useState({})
    const [selectChatroomId, setSelectChatroomId] = useState("")

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
        })
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
        .then(console.log(1))
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
        setSelectChatroomId(chatRoomId)
    }

    // // DEBUG 함수
    // const confirm = () => {
    //     console.log(count)
    // }

   
    return (
        <div>
            <div>{user2UId}</div>
            <div id="frame">
         
                {/* 사이드바 */}
            <div id="sidepanel" >
                {/* 1. 왼쪽 상단, 나의 프로필상태 */}
                <div id="profile">
                    <div className="wrap">
                        <img
                    
                        // src={mydata.userDetail?.profile_image}
                        src =    "data:image/jpeg;base64,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"

                        alt=""
                        />
                        <p style={{marginLeft:10}}>{mydata.username}</p>
                    </div>
                </div>

                {/* <div id="search" /> */}
                {/* 2.왼쪽 중앙, 채팅방 */}
                <div id="contacts">
                <ul style={{padding:3}}>
                    {/* 2-1. 클릭시 활성화(박스 하얀색) */}
                    {chatrooms.map((chatroom,idx) => (
                        
                    <li key={idx} id="list-style"
                        onClick={(e)=>{
                            selectChatroom(chatroom.chatRoomId,chatroom.user1Id,chatroom.user1UId,chatroom.user2Id,chatroom.user2UId)}
                        }
                        className={
                            chatroom.chatRoomId && chatroom.chatRoomId === selectChatroomId
                            ? "contact active"
                            : "contact"
                        }
                    >

                        {/* 2-2. 안 읽은 메시지 표시하기 */}
                        <div className="wrap" style={{marginTop: 5, width:"100%"}}>
                            {/* image가 업로드 기준이라 확인이 힘듬  */}
                            <img style= {{
                                width: 40,
                                borderRadius: 50,
                                float: "left",
                                marginRight: 10,
                                marginLeft: 10,
                            }}
                             src=
                            //  {chatroom.imagePath} alt="" />
                            "data:image/jpeg;base64,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" />
                            <div className="meta" >
                                {mydata.username === chatroom.user1Name 
                                ?  <p className="name" style={{display: "inline-block"}}>{chatroom.user2Name}</p>
                                :  <p className="name" style={{display: "inline-block"}}>{chatroom.user1Name}</p>
                                }
                            <div style={{
                                display: "inline-block",
                                float: "right"
                            }}>
                                <NoMeetingRoomIcon onClick={(e)=>{deleteChatroom(chatroom.chatRoomId, e)}}/>
                            </div>
                            <hr/>
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>
                </div>

            </div>

            {/* 중앙메시지 창 */}

            {/* 1. 중앙 왼쪽 상단에 상대의 사진과 이름 표기 */}
            <div className="content">
        
                <div className="contact-profile">
                    <img src={opponentdata?.profileImage} alt="you" />
                    <p>{opponentdata.username}</p>
                    <ChatVideo/>
                </div>
             

                {/* 2. 메시지 배치
                    메시지전송유저 == 나: clsaa:sent(오른쪽배치)
                    메시지전송유저 != 나: class:replies(왼쪽배치)
                */}
                <ScrollToBottom className="messages">
                <ul style={{paddingLeft:0}}>
                    {chatMessages.map((msg) => (
                    <li style={{paddingRight: 10}} className={msg.sendUserId === mydata.id ? "sent" : "replies"}>
                        {msg.sendUserId !== mydata.id
                        ?(
                            <img src=
                            {opponentdata?.profileImage} alt="" />
                        )
                        :(
                            <img src=
                            "data:image/jpeg;base64,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" />
                            // {mydata.userDetail?.profile_image} alt="" />
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
// }

export default Chat;

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