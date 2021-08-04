import React from 'react'
import './ChatVisual.css'
import {ListGroup, Image} from 'react-bootstrap'
import MainImage from '../assets/main/sports.png'
import ChatRightBox from '../components/ChatComponents/ChatRightBox'
import ChatFooter from '../components/ChatComponents/ChatFooter'

function ChatVisual () {
    const userdata = [
 
        {id : "1", name:"sara", lang: "ko"},
        {id : "2", name:"lala", lang: "ko"},
        {id : "3", name:"kaka", lang: "ko"},
    ]
  return (
    <div>
      <div className="mainbox">
          <div className="box-sticky">
            <div><p>chats</p></div>
            <ListGroup > 
                {userdata.map((user, id) => (
                    <ListGroup.Item key= {id}>
                        <Image src={MainImage} style={{width: "50px", height:"100px", display:"inline-block"}}  alt="mainimage"/> 
                        <div style={{display:"inline"}} >
                            <p>userid : {user.id}</p>
                            <p>username : {user.name}</p>
                            <p>userlang : {user.lang}</p>
                        </div>
                </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
          <div class="updown"></div> {/* 직선 */}
          <div className="box">
              <div style={{border: "1px solid",height:"500px",width:"500px", position:"relative"}}>

                <ChatRightBox/>
                <ChatFooter/>
              </div>
          </div>
        </div>

     
      
    </div>
  )
}

export default ChatVisual