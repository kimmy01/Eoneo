import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import './LoginPage.css'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../src/_actions/user_actions'
import { withRouter } from 'react-router-dom'
// import GoogleLogin from 'react-google-login'

// const clientId = "OAuth Web Client ID"

import { useRecoilValue, useRecoilState } from "recoil";
import {
  myIdState
} from "../../state/State";

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
        if (response.payload.token) {
          console.log(response.payload)
          localStorage.setItem("token", response.payload.token)
          localStorage.setItem("user_id", response.payload.id)
          if (response.payload.loginCount === 0) {
            alert("please insert your detail infomation");
            window.location.href = '/update/user_detail'
          } else {
            window.location.href = '/searchFriends'
          }
          // props.history.push('/searchFriends') // 로그인하면 메인페이지로
        } else {
          alert('ERROR')
        }
      })

  }

  // const onSuccess = async(response) => {
  //   console.log(response);

  // const { googleId, profileObj : { email, name } } = response;

  // await onSocial({
  //     socialId : googleId,
  //     socialType : 'google',
  //     email,
  //     nickname : name
  // });
  // }

  //   const onFailure = (error) => {
  //     console.log(error);
  // }

  return (
    <Container fluid className="row">
      <div className="col-4"></div>
      <div className="col-4">
        <h1 className="main-title">Login</h1>
        <Form className="mt-4 " onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={Email} onChange={onEmailHandler} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
        </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={Password} onChange={onPasswordHandler} />
          </Form.Group>


          <div>
            <Button className="button" variant="flat" type="submit">
              SignIn
        </Button>
          </div>

          <hr />

          <div>
            <p></p>
            <Button onClick={onSignUpHandler} className="button" variant="flat" type="button">
              SignUp
        </Button>
          </div>

        </Form>
      </div>
      <div className="col-4"></div>


      <style type="text/css">
        {`
          .btn-flat {
            background-color: #685de2;
            color: white;
          }

          .btn-social {
            border-color: #463cbd;
            color: white;
          }
        `}
      </style>



    </Container>
  )


}

export default withRouter(LoginPage)