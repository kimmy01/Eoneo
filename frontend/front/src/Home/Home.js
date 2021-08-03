import React from 'react'
import {  Image } from 'react-bootstrap'
import MainImage from '../assets/Home/main.jpg' 
import ProfileCards from './ProfileCards'
import './Home.css'
import Footer from '../components/Footer/Footer'


function Home () {
  return (
    <div>
      <a href="/chat">
        Chat
      </a>
      <a href="/videochat">
        VideoChat
      </a>
      <div className="image">
        <Image src={MainImage} width='900' height='600' alt="mainimage"/>
      </div>
      <div className="cards"> 
       <ProfileCards />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home