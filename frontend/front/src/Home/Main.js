import React from 'react';
import LoginPage from '../components/LoginPage/LoginPage'
import mainlogo from "../assets/main/mainlogo.png";
import './main.css';
import { Container, Navbar, Nav } from 'react-bootstrap';

function Main() {
    return (
        <div class="mainpage">
            <div class="mainlogo">
                <img src={mainlogo} alt="logo" width="300px" />
            </div>
            <div>
                <LoginPage />
            </div>
        </div>
    );
}

export default Main;