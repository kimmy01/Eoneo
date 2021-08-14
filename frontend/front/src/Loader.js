import React from 'react';
import ReactLoading from 'react-loading';
import './loader.css';

function Loader({type, color, message}){
    return(
        <div class="contentWrap">
            <div style={
                {
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }
            }>
                <h4 class="loadingmessage">{message}</h4>
                <br/>
                <ReactLoading
                    type={type}
                    color={color}
                    height={'50%'}
                    width={'50%'}/>
            </div>
        </div>
    )
}

export default Loader;