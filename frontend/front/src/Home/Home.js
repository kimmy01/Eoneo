import React from 'react'
import {  Image } from 'react-bootstrap'
// import NavBar from '../components/NavBar/NavBar'
import MainImage from '../assets/Home/main.jpg' 
import ProfileCards from './ProfileCards'
import './Home.css'
// import Chat from '../Chat/Chat'


function Home () {
  return (
    <div>
      <a href="/chat">
        Chat
      </a>
      <div className="image">
        <Image src={MainImage} width='900' height='600' alt="mainimage"/>
      </div>
      <div className="cards"> 
      <ProfileCards />
      </div>
    </div>
  )
}

export default Home