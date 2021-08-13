import React, {useEffect, useState} from 'react';
import './userlist.css';
import {useRecoilState} from 'recoil';
import {getUserListState, userIdState, user1UIdState, user2IdState, user2UIdState, roomSeqState} from '../state/state.js';
import { Badge } from '@material-ui/core';
import axios from 'axios';

function UserList(){

    const [userList] = useRecoilState(getUserListState);
    const [myId] = useRecoilState(userIdState);
    // const [roomData , setRoomData] = useRecoilState(roomDataState);
    const [user1UId, setUser1UId] = useRecoilState(user1UIdState);
    const [user2Id, setUser2Id] = useRecoilState(user2IdState);
    const [user2UId, setUser2UId] = useRecoilState(user2UIdState);
    const [RoomSeq, setRoomSeq] = useRecoilState(roomSeqState)
    // const [RoomSeq2, setRoomSeq2] = useState("test");
    const jwttoken = 'Bearer ' + localStorage.getItem('token')

    // const test =  function (params,e) {
    //     clickHandler(params,e)
    //         .then(res => {
    //             setRoomSeq(res.data.data.chatRoomId)
    //         })
    //         .catch(err => console.log(err))
        // console.log(temp2)
        // setRoomSeq(temp2)
        // window.location.href = '/chat'

        //1. router 사용할 것 : js코드여서 react와 lifecycle이 다름
        //2. 주소, 인자로 넘긴다. -> chatroomid는 주소로부터 가져온다 -> 렌더, 스테이트 반영 시작 
        //3. 콜백의 전제조건: 프로미스객체를 리턴해야만 사용가능
        //4. 콜백??????? : .then(callback)

    

    const clickHandler= (params, e) => {
        setUser1UId(Math.random().toString(36).substr(2,11));
        setUser2UId(Math.random().toString(36).substr(2,11));
        setUser2Id(params);

        const roomData =    {
            "user1Id": myId,
            "user1UId": user1UId,
            "user2Id": params,
            "user2UId": user2UId
        }

        axios.post('http://localhost:8080/api/chatroom/create', 
        roomData, 
            {headers:{ 'Authorization': jwttoken }},
            )
            .then(response =>  {
                setRoomSeq(response.data.data.chatRoomId, window.location.replace('/chat'));
                console.log(response)
        })
        // .then(window.location.replace('/chat'))
            // window.location.href = '/chat'
            
            // .then(window.location.replace('/chat'))
            // .then(response =>   setRoomSeq(response.data.data.chatRoomId))
            .catch((err) => console.log(err));
            
    }

    

    return(
        <div class="userlistDiv">
            <h1>{RoomSeq}</h1>
            <p>uid1: {user1UId}</p>
            <p>uid2: {user2UId}</p>
            <p>myid: {myId}</p>
            <p>id2: {user2Id}</p>
            {userList.map((user, id) => (
                <div class="profilebox" onClick={(e) => {clickHandler(user.id)}}>
                    <div class="image">
                        <Badge
                            overlap="rectangle" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            badgeContent={<img src={user.userDetail?.nationality?.flag} width="40px" alt="flag"/>}>
                            <img class="profileImage" src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile10.uf.tistory.com%2Fimage%2F9931CB4B5D904D76076758" alt="profile"/>
                        </Badge>
                    </div>
                    <div class="textlayer">
                        <div>
                            <p id="nickname">{user.userDetail?.nickname}</p>
                            <p id="username">{user.username}</p>
                        {/* </div>
                        <div class="detail"> */}
                            <p id="desc">{user.userDetail?.description}</p>
                        </div>
                        <div class="language">
                            <p id="want">{user.userLanguage.wantLanguage.language}</p>
                            <p id="fluent">{user.userLanguage.fluentLanguage.language}</p>
                            <p id="native">{user.userLanguage.nativeLanguage.language}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserList;