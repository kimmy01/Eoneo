import React, {useState, useEffect} from 'react'
import {  Image } from 'react-bootstrap'
import MainImage from '../assets/Home/main.jpg' 
import ProfileCards from './ProfileCards'
import './Home.css'
import Footer from '../components/Footer/Footer'


function Home () {
  const [isLogin, setisLogin] = useState(false)

  useEffect(() => {
      
    if (localStorage.getItem('token')) {
      // console.log(localStorage.getItem('token'))
      setisLogin(true)
      console.log(isLogin)
  }
  });


  return (
    <div>
      <img style={{height:"30px", width:"30px"}} src="https://opendata.mofa.go.kr:8444/fileDownload/images/country_images/flags/143/20201125_214220585.gif" />
      <a href="/chat">
        Chat껍데기
      </a>
      
      <a href="/chat1">
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