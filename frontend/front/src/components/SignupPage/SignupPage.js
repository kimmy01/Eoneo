import React from 'react'
import { Form, Button, Col, Row, InputGroup, FormControl } from 'react-bootstrap'
import "./SignupPage.css"

function Signup () {
  return (
    <div class="container">
      <h1 className="main-title">Sign up</h1>
      <Form className="mt-4">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control type="password" placeholder="FirstName LastName" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Username</Form.Label>
          <Form.Control type="password" placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="ConfirmPassword" />
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
        <Form.Check type="checkbox"  label="이메일 소식받기(선택)" />
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

export default Signup