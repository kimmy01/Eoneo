import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import './NavBar.css'

function NavBar() {


  return (
    <div>
    <Navbar bg="light" variant="light" >
    <Container>
    <Nav.Item>
      <Nav.Link className="logo" href="/">EONEO</Nav.Link>

    </Nav.Item>
   
  
    <Nav className="register">
      
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/signup">Signup</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
    </div>
  )
}

export default NavBar