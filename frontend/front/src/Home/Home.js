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
      setisLogin(true)
      console.log(isLogin)
  }
  });


  return (
    <div>
      <a href="/chatTest">
        ChatTest
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