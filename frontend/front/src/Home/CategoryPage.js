import React from 'react'
import './CategoryPage.css'
import {Row, Col, Card, Image} from 'react-bootstrap'
import MainImage from '../assets/main/sports.png'

function CategoryPage () {
  return (
    <div>
      <div className="mainbox">
          <div className="box-sticky">
            <Row xs={1} md={3} className="g-4">
              {Array.from({ length: 9 }).map((_, idx) => (
                <Col>
                  <Card>
                    <Image src={MainImage}  alt="mainimage"/>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          
          <div className="box">
          </div>
        </div>

     
      
    </div>
  )
}

export default CategoryPage