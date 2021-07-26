import React, {useState} from 'react'
import { Form, Button, Container} from 'react-bootstrap'
import './LoginPage.css'

function LoginPage() {
  // const [Email, setEmail] = useState("")
  // const [Password, setPassword] = useState("")

  return (
    <Container>
    <h1 className="main-title">Login</h1>
    <Form className="mt-4">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email </Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <div>
        <Button className="button" variant="flat" type="submit">
          Login
        </Button>
      </div>

      <hr/>

      <div>
        <Button className="button" variant="social" type="submit">
          Social Login
        </Button>
      </div>

     </Form>
     
     <style type="text/css">
        {`
          .btn-flat {
            background-color: #685de2;
            color: white;
          }

          .btn-social {
            background-color: #463cbd;
            color: white;
          }
        `}
      </style>



    </Container>
  )

  
}

export default LoginPage