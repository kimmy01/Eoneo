import React from 'react';
import CategoryNY from './CategoryNY';
import UserListNY from './UserListNY';
import './searchuser.css';

function SearchFriendsNY(){
    return(
        <div class="main">
            <div class="category">
                <CategoryNY/>
            </div>
            <div class="userlist">
                <UserListNY/>
            </div>
        </div>
    );
}

export default SearchFriendsNY;