import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import './NavBar.css'

function NavBar() {


  return (
    <div>
    <Navbar bg="light" variant="light" fixed="top">
    <Container>
    <Nav classMane="logo">
      <Navbar.Brand href="/home">Navbar</Navbar.Brand>
    </Nav>
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