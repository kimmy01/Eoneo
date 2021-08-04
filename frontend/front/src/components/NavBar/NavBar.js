import React, {useEffect,useState} from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import './NavBar.css'

function NavBar() {
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
      { isLogin === true 
      ? (
        <Navbar bg="light" variant="light" >
        <Container>
          <div className="mynav">
            <div  className="mynavItem">
              <Nav.Link href="/login">chat</Nav.Link>
              <Nav.Link href="/signup">Search Friends</Nav.Link>
              <Nav.Link href="/signup">Video Chat(단축키)</Nav.Link>
              <p>수정완료전임 조심할것</p>
            </div>
            <div  className="mynavItem item2">
              <Nav.Link className="logo" href="/">EONEO</Nav.Link>
            </div>
            <div className="mynavItem item3">
              <Nav.Link href="/login">Logout</Nav.Link>
            </div>
          </div>
</Container>
</Navbar>
  
          )
      :(
                <Navbar bg="light" variant="light" >
                          <Container>
                            <div className="mynav">
                              <div  className="mynavItem">
                                {/* <span>영역</span> */}
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

export default NavBar