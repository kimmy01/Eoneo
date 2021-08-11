import React, {useState} from 'react'
import { Form, Button, Container} from 'react-bootstrap'
import './LoginPage.css'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../src/_actions/user_actions'
import {withRouter } from 'react-router-dom'
// import GoogleLogin from 'react-google-login'

// const clientId = "OAuth Web Client ID"

import { useRecoilValue, useRecoilState } from "recoil";
import {
  myIdState
} from "../../State/State";

function LoginPage(props) {
  const dispatch = useDispatch()
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [myId,setMyID] = useRecoilState(myIdState)
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
   
  const onSubmitHandler = (event) => {
    event.preventDefault()

    let body = {
      email: Email,
      password: Password
    }
    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.token) {
          console.log(response)
          localStorage.setItem("token",response.payload.token)
          setMyID(response.payload.id)
          localStorage.setItem("user_id",response.payload.id)
          props.history.push('/') // 로그인하면 메인페이지로
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
    <Container>
    <h1 className="main-title">Login</h1>
    <Form className="mt-4" onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email </Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={Email} onChange={onEmailHandler}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={Password} onChange={onPasswordHandler}/>
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
        {/* <div>
            <GoogleLogin
                clientId={clientId}
                responseType={"id_token"}
                onSuccess={onSuccess}
                onFailure={onFailure}/>
        </div> */}
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

export default withRouter(LoginPage)