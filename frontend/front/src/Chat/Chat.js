import React, { useEffect, useRef, useState } from "react";
// import { Button, message } from "antd";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
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


// 필요한 예상 DB
const mydata = [
    
    {id : 2, name:"me", lang: "ko", profileImage:"data:image/jpeg;base64,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"},
    
]

const opponentdata = [
    {id : 18, name:"you", lang: "ko", profileImage:"data:image/jpeg;base64,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"}
]

/////////////////////////////////////////

const ROOM_SEQ = "24ad750d-fea7-4f61-8cbd-b01891002141";
const Chat = () => {
    const client = useRef({});
    const chattoken = 'Bearer '+localStorage.getItem('token')
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [chatrooms, setChatrooms] =useState([])

    useEffect(() => {
        connect();
        getDBdata()
        getChatroomList()
        return () => disconnect();
    }, []);

    // websocket 연결
    const connect = () => {
        client.current = new StompJs.Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/chatEonoe-websocket"), // proxy를 통한 접속 //internet explore
        connectHeaders: {
            "Authorization": chattoken,
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
        client.current.subscribe('/subscribe/'+mydata[0].Uid+'/queue/message', ({ body }) => {
            setChatMessages((chatMessages) => [...chatMessages, JSON.parse(body)]);
        });
    };
    
    //메시지 전송
    const publish = (message) => {
        if (!client.current.connected) {
        return;
        }
        let messagesdata = {
            chatRoomId: '24ad750d-fea7-4f61-8cbd-b01891002141',
            sendUserId: mydata[0].id, //
            message: message,
            sendUserUId : mydata[0].Uid,
            receiveUserUId : opponentdata[0].Uid
        };
        
        client.current.publish({
            destination: "/publish/chat/message",
            body : JSON.stringify(messagesdata),
        }
        )

        console.log(JSON.stringify(messagesdata))
        ;
    };

    
    // 개인적으로 만든 함수
    //공통 헤더
    const config = {
        headers: { "Authorization": chattoken },
      }

    // 채팅메시지: 해당채팅방 메시지정보 불러오는 함수
    const getDBdata = () => {
        axios.get(`http://localhost:8080/api/chatroom/room/${ROOM_SEQ}/`,config)
        .then(response => 
                {response.data.data.chats.map((chat,chatMessageId) =>
                    setChatMessages((chatMessages) => [...chatMessages,chat]))
                })
        .catch((Err) => console.error(Err));
    }
    
    // 채팅방리스트: 현재 유저의 채팅방 리스트 불러오는 함수
    const getChatroomList = () => {
        axios.get(`http://localhost:8080/api/chatroom/rooms/${mydata[0].id}/`,config)
        .then(response => 
            {response.data.data.chatRoomList.map((room,chatRoomId) =>
                setChatrooms((chatrooms) => [...chatrooms,room]))
            })
    }

   
    // 채팅방삭제: 해당 채팅방을 제거하는 함수
    ///////////// 실행안됌: 401에러 ///////////////////////
    const deleteChatroom = (chatRoomId,e) => {
        console.log(chatRoomId)
        console.log(e)
        axios.patch(`http://localhost:8080/api/chatroom/room/${mydata[0].id}/${chatRoomId}`,{
            headers: { "Authorization": chattoken }
        })
        .then(response => console.log(response))
        .catch((Err) => console.error(Err));
    }


    


    // DEBUG 함수
    // const confirmMessage = () => {
    //     console.log(chatMessages)
    // }

   
    return (
        <div>
            <div id="frame">
                {/* 사이드바 */}
            <div id="sidepanel">
                {/* 1. 왼쪽 상단, 나의 프로필상태 */}
                <div id="profile">
                    <div class="wrap">
                        <img
                        id="profile-img"
                        src={mydata[0].profileImage}
                        class="online"
                        alt=""
                        />
                        {mydata[0].name}
                        <div id="status-options">
                        <ul>
                            <li id="status-online" class="active">
                            <span class="status-circle"></span> <p>Online</p>
                            </li>
                            <li id="status-away">
                            <span class="status-circle"></span> <p>Away</p>
                            </li>
                            <li id="status-busy">
                            <span class="status-circle"></span> <p>Busy</p>
                            </li>
                            <li id="status-offline">
                            <span class="status-circle"></span> <p>Offline</p>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>

                <div id="search" />
                {/* 2.왼쪽 중앙, 채팅방 */}
                <div id="contacts">
                <ul>
                    {/* 2-1. 클릭시 활성화(박스 하얀색) */}

                    {chatrooms.map((chatroom) => (
                    <li
                        // onClick={() => setActiveContact(chatroom)}
                        class={
                            "contact"
                        // activechatroom.id && chatroom.id === activechatroom.id
                        //     ? "contact active"
                        //     : "contact"
                        }
                    >

                        {/* 2-2. 안 읽은 메시지 표시하기 */}
                        <div class="wrap">
                            <span class="contact-status online"></span>
                            <img id={chatroom.chatRoomId} src={chatroom.imagePath} alt="" />
                            <div class="meta">
                                <p class="name">{chatroom.user2Name}</p>
                                {
                                // chatroom.newMessages !== undefined &&
                                chatroom.unReadCount > 0 && (
                                    <p class="preview">
                                        {chatroom.unReadCount} 
                                        new messages
                                    </p>
                                )}
                            
                                <NoMeetingRoomIcon onClick={(e)=>{deleteChatroom(chatroom.chatRoomId, e)}}/>
                      
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>
                </div>

                {/* 3. 왼쪽 하단 프로필, 세팅 버튼 설정 */}
                <div id="bottom-bar">
                <button id="addcontact">
                    <i class="fa fa-user fa-fw" aria-hidden="true"></i>{" "}
                    <span>Profile</span>
                </button>
                <button id="settings">
                    <i class="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
                    <span>Settings</span>
                </button>
                </div>

            </div>

            {/* 중앙메시지 창 */}

            {/* 1. 중앙 왼쪽 상단에 나의 사진과 이름 표기 */}
            <div class="content">
                <div class="contact-profile">
                <img src={opponentdata[0].profileImage} alt="" />
                <p>{opponentdata[0].name}</p>
                </div>

                {/* 2. 메시지 배치
                    메시지전송유저 == 나: clsaa:sent(오른쪽배치)
                    메시지전송유저 != 나: class:replies(왼쪽배치)
                */}
                <ScrollToBottom className="messages">
                <ul>
                    {chatMessages.map((msg) => (
                    <li class={msg.sendUserId === mydata[0].id ? "sent" : "replies"}>
                        {msg.sendUserId !== mydata[0].id
                        ?(
                            <img src={opponentdata[0].profileImage} alt="" />
                        )
                        :(
                            <img src={mydata[0].profileImage} alt="" />
                        )
                        }
                        <p>{msg.message}</p>
                    </li>
                    ))}
                    
                </ul>
                </ScrollToBottom>

                {/* 3. 메시지 전송창 */}
                <div class="message-input">
                <div class="wrap">
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
    </div>
    )
}

export default Chat;