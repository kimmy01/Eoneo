import React from 'react';
import Category from './Category';
import UserList from './UserList';
import './searchuser.css';

function SearchFriends(){
    return(
        <div class="main">
            <div class="category">
                <Category/>
            </div>
            <div class="userlist">
                <UserList/>
            </div>
        </div>
    );
}

export default SearchFriends;