import React, {useState } from 'react'
import { Form, Button, Col, Row, InputGroup, FormControl } from 'react-bootstrap'
import "./SignupPage.css"
import { useDispatch } from 'react-redux'
import {registerUser} from '../../../src/_actions/user_actions'
import { withRouter } from 'react-router-dom'

function Signup (props) {
  const dispatch = useDispatch()
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    
    if(Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호확인은 같아야합니다.")
    }
    let body = {
      email: Email,
      password: Password,
      name: Name,
    }
    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success) {
        props.history.push('/login') // 사인업하면 메인페이지로
      } else {
        alert('ERROR')
      }
      
    })
  }

  return (
    <div class="container">
      <h1 className="main-title">Sign up</h1>
      <Form className="mt-4" onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={Email} onChange={onEmailHandler}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control type="password" placeholder="FirstName LastName" value={Name} onChange={onNameHandler}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Username</Form.Label>
          <Form.Control type="password" placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={Password} onChange={onPasswordHandler}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="ConfirmPassword" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
        </Form.Group>
    
      <div className="form-center">
        <div style={{height:24}}>
          <Form.Check style={{display:'inline-block'}} type="checkbox"  label="이용약관 " />
          <p style={{display:'inline-block'}}> &nbsp;  보기</p>
        </div>

        <div style={{height:24}}>
          <Form.Check style={{display:'inline-block'}} type="checkbox"  label="개인정보 수집 이용 동의" />
          <p style={{display:'inline-block'}}> &nbsp;  보기</p>
        </div>
        <Form.Check type="checkbox"  label="만 14세 이상입니다" />
        
      </div>
  
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
      
      <div>  
        <Button className="button" variant="flat" type="submit">
          Signup
        </Button>
      </div>
        <hr/>

      <div>
        <Button className="button" variant="social" type="submit">
          Social Signup
        </Button>
      </div>
    </Form>
    </div>
  )
}

export default withRouter(Signup)