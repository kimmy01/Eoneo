import React from 'react'
import './CategoryPage.css'
import Category from './Category' 

// import MainImage from '../assets/main/sports.png'
{/* <Image src={MainImage}  alt="mainimage"/> */}

function CategoryPage () {
  return (
    <div>
      <div className="mainbox">
          <div className="box-sticky">
            <Category/>
          </div>
          
          <div className="box">
            
          </div>
        </div>

     
      
    </div>
  )
}

export default CategoryPage