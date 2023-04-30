import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import contoler from "../../controler";

function Popup(prop) {
    const [show, setShow] = useState(false)
    const [wallet_address , walAdrHandler]=useState()


    async function submitHandler(e){
        e.preventDefault()
        const sender = window.ethereum.selectedAddress
        const a = new contoler(sender)
        await a.approveDoctor(wallet_address , sender)
        prop.f5()
        setShow(false)



    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Doctor
            </Button>

            <Modal show={show} onHide={handleClose} className=''  >
                <Modal.Header closeButton > <Modal.Title>Add Doctor</Modal.Title>  </Modal.Header>
                <Modal.Body>
                    <form  className=' ' onSubmit={submitHandler}>
                        <input required={true} onChange={(e)=>{walAdrHandler(e.target.value)}}  placeholder='Wallet Adress' pattern="^(0x)?[0-9a-fA-F]{40}$" className='form-control  ' />
                        <p className='text-muted '><small>* To add the doctor you have to add his wallet address </small></p>
                        <Modal.Footer>
                            <button className="btn btn-secondary " onClick={handleClose}>Close</button>
                            <button className='btn btn-primary ' >Submit</button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Popup