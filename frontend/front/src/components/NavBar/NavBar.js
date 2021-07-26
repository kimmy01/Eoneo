import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import './NavBar.css'

function NavBar() {


  return (
    <div>
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
    </div>
  )
}

export default NavBar