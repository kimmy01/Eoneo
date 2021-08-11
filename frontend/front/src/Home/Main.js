import React from 'react';
import LoginPage from '../components/LoginPage/LoginPage'
import mainlogo from "../assets/main/mainlogo.png";

function Main(){
    return(
        <div class="mainpage">
            <div>
                <img src={mainlogo} alt="logo" width="300px"/>
            </div>
            <div>
                <LoginPage/>
            </div>
        </div>
    );
}

export default Main;