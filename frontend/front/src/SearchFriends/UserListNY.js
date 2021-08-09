import React from 'react';
import './userlist.css';
import {useRecoilState} from 'recoil';
import {getUserListState} from './state.js';

function UserListNY(){

    const [userList] = useRecoilState(getUserListState);
    console.log(userList[0].userDetail.description)

    return(
        <div class="userlistDiv">
            <h1>UserList</h1>
            {userList.map((user, id) => (
                
                <div class="card">
                    <img class="profileImage" src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile10.uf.tistory.com%2Fimage%2F9931CB4B5D904D76076758" alt="profile"/>
                    {/* <img src={user.userDetail.nationality} alt="flag"/> */}
                    <div class="contentText">
                        <p id="username">{user.username}</p>
                        <p>fluent : {user.userLanguage.fluentLanguage.language}</p>
                        <p>native : {user.userLanguage.nativeLanguage.language}</p>
                        <p>want : {user.userLanguage.wantLanguage.language}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserListNY;