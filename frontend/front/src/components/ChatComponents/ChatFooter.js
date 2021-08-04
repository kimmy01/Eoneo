import React from 'react'
import "./ChatFooter.css"

function ChatFooter() {
    const handlechatvideo = () => {
        console.log(1)
    }
    return (
        <div>
            <div className="chatfooter">
                 <input/>
                 <button onClick={handlechatvideo} style={{color:'white'}}>button</button>
            </div>
        </div>
    )
}

export default ChatFooter
