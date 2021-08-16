//react
import React, {useState} from 'react';
import Openvidu from './Openvidu';
// css
import {Button,Modal} from "react-bootstrap"
import './ModalComponent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from "@fortawesome/free-solid-svg-icons";

 function ModalCompontet() {

    // state
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    //modal on function
    function handleShow(breakpoint) {
      setFullscreen(breakpoint);
      setShow(true);
    }

    // props modal close function
    const closeModal = () => {
      setShow(false)
    }
  
    return (
      <>
       {/* modal button */}
        <Button className="video-button" onClick={() => handleShow(true)}>
          <FontAwesomeIcon icon={faVideo} />
          &nbsp; video call
          {typeof true === 'string' && `below ${true.split('-')[0]}`}
        </Button>

        {/* modal */}
        <Modal id="openvidu-modal" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
          {/* close button header */}
          <Modal.Header>
            <Modal.Title>Video Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body  >
            <Openvidu onClose={closeModal}/>
          </Modal.Body>
        </Modal>
      </>
    );
  }

export default ModalCompontet
