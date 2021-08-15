import React, {useEffect, useState} from 'react';
import {Button,Modal} from "react-bootstrap"
import Openvidu from './Openvidu';

export default function ModalCompontet() {
    // const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
  
    function handleShow(breakpoint) {
      setFullscreen(breakpoint);
      setShow(true);
    }
  
    return (
      <>
       
          {/* <Button  className="me-2" onClick={() => handleShow(true)}>
            Full screen
            {typeof true === 'string' && `below ${true.split('-')[0]}`}
          </Button>  */}
          
          <Button  className="me-2" onClick={() => handleShow(true)}>
            Full screen
            {typeof true === 'string' && `below ${true.split('-')[0]}`}
          </Button>
  
        <Modal style={{marginTop:10, marginBottom:100, height:"90%"}} show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body  >
            <Openvidu/>
          </Modal.Body>
        </Modal>
      </>
    );
  }
