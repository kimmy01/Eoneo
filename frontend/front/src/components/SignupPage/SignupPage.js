import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import "./SignupPage.css"
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../src/_actions/user_actions'
import { withRouter } from 'react-router-dom'

function Signup(props) {
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

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야합니다.")
    }
    let body = {
      email: Email,
      password: Password,
      username: Name,
    }
    dispatch(registerUser(body))
      .then(response => {
        console.log(response)
        if (response.payload) {
          window.location.href = '/'
          // props.history.push('/login') // 사인업하면 메인페이지로
        } else {
          alert('ERROR')
        }

      })
  }

  return (
    <Container fluid className="row">
      <div className="col-4"></div>
      <div className="col-4">
      <h1 className="main-title">Sign up</h1>
      <Form className="mt-4" onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="signuplabel">Email: </Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={Email} onChange={onEmailHandler} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label className="signuplabel">Name</Form.Label>
          <Form.Control type="text" placeholder="Name" value={Name} onChange={onNameHandler} />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label className="signuplabel">Nickname</Form.Label>
          <Form.Control type="text" placeholder="Nickname" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="signuplabel">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={Password} onChange={onPasswordHandler} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="signuplabel">Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="ConfirmPassword" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        </Form.Group>

        <div >
          <Button style={{marginTop:40}} className="signupbtn" variant="flat" type="submit">
            Signup
        </Button>
        </div>
        </Form>
        </div>
        <div className="col-4"></div>
    </Container>
  )
}

export default withRouter(Signup)