import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import Test from '../assets/Home/testpic.png'
import './ProfileCards.css'
function ProfileCards () {
  return (
    
    <div class="container" style={{ marginTop:'40px'}}>
      

      <Row xs={1} md={2} lg={4} className="g-4">
        {Array.from({ length: 12 }).map((_, idx) => (
          <Col>
            <div className="cardbox">
              <div className="content">
                <div className="front">
                  <Card.Img style={{ borderRadius: 150, height: 250, width: 250 }} variant="top" src={Test} />
                </div>
                <div className="back">
                  <p style={{height: 30}}>ddd</p>
                  <p>kkkk</p>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>


    </div>
  )
}

export default ProfileCards
