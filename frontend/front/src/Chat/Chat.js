//vPrl
// messageTye = 0이면, 문자 1이면 이미지 2이면 음성
import React, { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import axios from 'axios'
import VideoChat from "./VideoChat"

const ROOM_SEQ = "24ad750d-fea7-4f61-8cbd-b01891002141";

const Chat = () => {
  const client = useRef({});
  const chattoken = 'Bearer '+localStorage.getItem('token')
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    connect();
    getDBdate()
    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/chatEonoe-websocket"), // proxy를 통한 접속 //internet explore
      connectHeaders: {
        "Authorization": chattoken,
        "userId":'18'
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

  // db랑 연결하는 코드를 따로 만들어야함!!!!
  // api : `/api/chatroom/room/${ROOM_SEQ}`
  const getDBdate = () => {
    const request = axios.get(`/api/chatroom/room/18/`)
      .then(response => console.log(response.data))
      .catch((Err) => console.error(Err));
  }

  const subscribe = () => {
    client.current.subscribe(`/subscribe/${ROOM_SEQ}`, ({ body }) => {
      setChatMessages((chatMessages) => [...chatMessages, JSON.parse(body)]);
    });
  };

  const publish = (message) => {
    if (!client.current.connected) {
      return;
    }
    let messagesdata = {
        chatRoomId: '24ad750d-fea7-4f61-8cbd-b01891002141',
        sendUserId: '2', //
        message: message,
        messageType: '0',
    };
    
    client.current.publish({
      destination: "/publish/chat/message",
      body: JSON.stringify(messagesdata),
    });
  };

  return (
    <div>
      {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages.map((_chatMessage, index) => (
            <li key={index}>{_chatMessage.message}</li>
          ))}
        </ul>
      )}
      <div>
        <input
          type={"text"}
          placeholder={"message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.which === 13 && publish(message)}
        />
        <button onClick={() => publish(message)}>send</button>
        <VideoChat/>
      </div>
    </div>
  );
};

export default Chat;