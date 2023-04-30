import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DisplayRowKV from "../../Components/DisplayRowKV";
import {Image, ModalHeader} from "react-bootstrap";
import img from '../../images/svg/medical-5459631.svg'
import controler from "../../controler";

function DoctorInfoPopUp(prop) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [doc_info, setDocInfo] = useState([]);

    useEffect(() => {
        const init = async () => {
            const sender = window.ethereum.selectedAddress;
            const a = new controler(sender);



            const obj = await a.getDoctorinfo(prop.addr)

            setDocInfo(obj);
        };

        init();
    }, []);
    return (
        <>
            <Button className='bg-dark border-dark' onClick={handleShow}>
                View info
            </Button>

            <Modal show={show} onHide={handleClose} size="lg"  >
                <Modal.Header closeButton >
                    <Modal.Title>Doctor info</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{backgroundImage : `url()` ,backgroundRepeat:'no-repeat',backgroundPosition:'left center'}}>
                    <div className='m-3' >
                        <DisplayRowKV lbl='First name'    valeur={doc_info.first_name} />
                        <DisplayRowKV lbl='Last name'     valeur={doc_info.last_name} />
                        <DisplayRowKV lbl='email'         valeur={doc_info.email} />
                        <DisplayRowKV lbl='specialite'    valeur={doc_info.specialite} />
                        <DisplayRowKV lbl='hospital_name' valeur={doc_info.hospital_name} />
                        <DisplayRowKV lbl='wilaya'        valeur={doc_info.wilaya} />
                        <DisplayRowKV lbl='phone'         valeur={doc_info.phone} />
                        <DisplayRowKV lbl='join_date'     valeur={doc_info.join_date} />
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-secondary " >Close</button>
                    <button className='btn btn-primary ' >Submit</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DoctorInfoPopUp