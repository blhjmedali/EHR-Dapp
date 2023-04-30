import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Spinner} from "react-bootstrap";
import ModalContext from "react-bootstrap/ModalContext";

function Loading() {
    const [show, setShow] = useState(false)



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="warning" onClick={handleShow}></Button>

            <Modal show={show} onHide={handleClose} centered  size='sm'   >

                <Modal.Body>
                    <Spinner animation="grow" />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Loading