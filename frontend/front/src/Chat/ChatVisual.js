import React from 'react'
import './ChatVisual.css'
import Chat from './Chat'
import ChatList from './ChatList'


function ChatVisual () {
 
  return (
    <div>
      <div className="mainbox">
          <div className="box">
            <div><p>chats</p></div>
            <ChatList/>
          </div>
          <div class="updown"></div> {/* 직선 */}
          <div className="box-sticky">
              <div style={{border: "1px solid",height:"500px",width:"500px", alignItems:'center'}}>
                <Chat/>
              </div>
          </div>
        </div>

     
      
    </div>
  )
}

export default ChatVisual