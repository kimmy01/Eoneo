import React from 'react';
import LoginPage from '../components/LoginPage/LoginPage'
import mainlogo from "../assets/main/mainlogo.png";
import enoeo_intro from '../../src/assets/main/enoeo_intro.png';
import './main.css';


function Main() {
    return (
        <div class="mainpage">

            <div class="mainImg">
                <img style={{width:1000}} src ={enoeo_intro} alt="intro_img"/>
            </div>

            <div class="mainlogin">
                <div class="mainlogo">
                    <img src={mainlogo} alt="logo" width="250px" />
                </div>
                <div>
                    <LoginPage />
                </div>
            </div>

        </div>
    );
}

export default Main;