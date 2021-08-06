import React, {useEffect,useState} from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import './NavBar.css'
import {withRouter } from 'react-router-dom'

function NavBar() {
  const [isLogin, setisLogin] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setisLogin(true)
    }
  });

  const handlelogout = (props) => {
    localStorage.removeItem('token')
    window.location.replace('/')
  }



  return (
    <div>
      { isLogin === true 
      ? ( //로그인 된 상태라면,
        <Navbar bg="light" variant="light" >
          <Container>
            <div className="mynav">
              <div  className="mynavItem">
                <Nav.Link href="/chat">chat</Nav.Link>
                <Nav.Link href="/main">Search Friends</Nav.Link>
                <Nav.Link href="/videochat">Video 단축키</Nav.Link>
              </div>
              <div  className="mynavItem item2">
                <Nav.Link className="logo" href="/">EONEO</Nav.Link>
              </div>
              <div className="mynavItem item3">
                <p onClick={handlelogout}>logout</p>
              </div>
            </div>
          </Container>
        </Navbar>
          )
      :( //로그인 안된 상태라면,
                <Navbar bg="light" variant="light" >
                          <Container>
                            <div className="mynav">
                              <div  className="mynavItem">
                              </div>
                              <div  className="mynavItem item2">
                                <Nav.Link className="logo" href="/">EONEO</Nav.Link>
                              </div>
                              <div className="mynavItem item3">
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/signup">Signup</Nav.Link>
                              </div>
                            </div>
                  </Container>
                </Navbar>
        )
      }
      </div>
      
  )
}

export default withRouter(NavBar)