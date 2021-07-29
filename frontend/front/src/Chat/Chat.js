// messageTye = 0이면, 문자 1이면 이미지 2이면 음성
import React, { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const ROOM_SEQ = "6caf6c54-1747-42aa-97d6-a287244cbacb";

const Chat = () => {
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      // brokerURL: "ws:http://localhost:8080/chatEonoe-websocket", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS("http://localhost:8080/chatEonoe-websocket"), // proxy를 통한 접속 //internet explore
      connectHeaders: {
        "auth-token": "spring-chat-auth-token",
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      

      // db랑 연결하는 코드를 따로 만들어야함!!!!
      // api : /api/chatroom/room/{roomId}

      onConnect: () => {
        firstsubscribe();
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

  const subscribe = () => {
    client.current.subscribe(`/subscribe/${ROOM_SEQ}`, ({ body }) => {
      setChatMessages((chatMessages) => [...chatMessages, JSON.parse(body)]);
    });
  };

  const firstsubscribe = () => {
    client.current.subscribe(`/api/chatroom/room/${ROOM_SEQ}`, ({ body }) => {
      setChatMessages((chatMessages) => [...chatMessages, JSON.parse(body)]);
    });
  };

  const publish = (message) => {
    if (!client.current.connected) {
      return;
    }
    let messagesdata = {
        chatRoomId: '6caf6c54-1747-42aa-97d6-a287244cbacb',
        sendUserId: '2', //
        message: message,
        messageType: '0',
    };

    client.current.publish({
      destination: "/publish/chat/message",
      body: JSON.stringify(messagesdata),
    });
   

    setMessage("");
    console.log("messagedata:")
    console.log(messagesdata)
    
  };

  const viewMessage = (event) => {
    console.log(chatMessages)
  }

  const enrollMessage = (event) => {
    setChatMessages({'message':'hi'})
  }

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
      </div>
      
      <button onClick={enrollMessage}>enroll</button>
      <button onClick={viewMessage}>messages</button>
    </div>
  );
};

export default Chat;