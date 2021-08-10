import React from 'react';
import './userlist.css';
import {useRecoilState} from 'recoil';
import {getUserListState, userIdState, user1UIdState, user2IdState, user2UIdState} from './state.js';
import { Badge } from '@material-ui/core';
import axios from 'axios';

function UserList(){

    const [userList] = useRecoilState(getUserListState);
    const [myId] = useRecoilState(userIdState);
    // const [roomData , setRoomData] = useRecoilState(roomDataState);
    const [user1UId, setUser1UId] = useRecoilState(user1UIdState);
    const [user2Id, setUser2Id] = useRecoilState(user2IdState);
    const [user2UId, setUser2UId] = useRecoilState(user2UIdState);


    const clickHandler = (params, e) => {
        setUser1UId(Math.random().toString(36).substr(2,11));
        setUser2UId(Math.random().toString(36).substr(2,11));
        setUser2Id(params);

        const roomData =    {
            "user1Id": myId,
            "user1UId": user1UId,
            "user2Id": user2Id,
            "user2UId": user2UId
        }

        axios.post('http://localhost:8080/api/chatroom/create',
        roomData, 
            {headers:{ 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTM0QHNzYWZ5LmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2Mjg2NTgyMDF9.P03QrLzWmX-NLh9bSzBS0xDPeZH3Zstsmz3rOW9pue_SdbAIYeVi8z9n9M2PmHYEkQW0bf5-NTbbRC4yzsYGKg' }},
            ).then(response =>  console.log(roomData))
            .catch((Error) =>  console.log(roomData));
            // window.location.replace('/chat'), 
    }

    return(
        <div class="userlistDiv">
            <h2>{user1UId}</h2>
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