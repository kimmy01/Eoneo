import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import './LoginPage.css'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../src/_actions/user_actions'
import { withRouter } from 'react-router-dom'
import swal from '@sweetalert/with-react'
// import GoogleLogin from 'react-google-login'

// const clientId = "OAuth Web Client ID"

import { useRecoilValue, useRecoilState } from "recoil";
import {
  myIdState
} from "../../state/state";

function LoginPage(props) {
  const dispatch = useDispatch()
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  function onSignUpHandler(e) {
    window.location.href = '/signup';
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()

    let body = {
      email: Email,
      password: Password
    }
    dispatch(loginUser(body))
      .then(response => {
        if (response?.payload?.token) {
          console.log(response.payload)
          localStorage.setItem("token", response.payload.token)
          localStorage.setItem("user_id", response.payload.id)
          if (response.payload.loginCount === 0) {
            alert("please insert your detail infomation");
            window.location.href = '/update/user_detail'
          } else {
            window.location.href = '/'
          }
        } else {
          swal({
            text: "Please check your email or password.",
            buttons: {
              cancel: "Close",
            },
          })
        }
      })

  }


  return (
    <Container fluid className="row">
      <div className="col-1"></div>
      <div className="col-10">
        <h1 className="main-title">Login</h1>
        <Form className="mt-4 " onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="signinlabel">Email </Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={Email} onChange={onEmailHandler} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="signinlabel">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={Password} onChange={onPasswordHandler} />
          </Form.Group>

          <div>
            <Button style={{width:"100%", marginTop:25}} className="signinbutton" variant="flat" type="submit">
              Login
            </Button>
          </div>

          <hr />

          <div>
            <Button style={{border:'none', backgroundColor:'white'}} onClick={onSignUpHandler} className="signupbutton" variant="flat" type="button">
              SignUp
            </Button>
          </div>
        </Form>
      </div>
      <div className="col-1"></div>
    </Container>
  )


}

export default withRouter(LoginPage)