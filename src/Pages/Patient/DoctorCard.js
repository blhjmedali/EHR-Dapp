import React from "react";
import {Card} from "react-bootstrap";
import img from "../../images/img_2.png";
import DisplayRowKV from "../../Components/DisplayRowKV";
import Button from "react-bootstrap/Button";
import DoctorInfoPopUp from "./DoctorInfoPopUp";
import controler from "../../controler";

const DoctorCard = (prop)=> {

    // UI
    const color ="dark"
    const bg = prop.admin ?"bg-dark bg-opacity-10":"bg-light bg-opacity-75"

    // if patient want to delete a doctor from [approved doctors]
    const deleteHandler = async () =>{
        // create instance of controller
        const sender = window.ethereum.selectedAddress
        const a = new controler(sender)

        // get doctor address to delete from parent component
        const doc_addr = prop.obj.address

        // call disapprove methode from controller
        await a.disapproveDoctor(doc_addr , sender);
        prop.f5()

    }


    return(
        <Card className={'m-3 '+bg} >
            <Card.Header className={`d-flex justify-content-center text-light bg-${color}`}>
                <small><i>{prop.obj.address}</i></small>
            </Card.Header>
            <Card.Body>
                <div className='d-flex'>
                    <Card.Img className={`w-25  align-items-center h-100 bg-${""}`} src={img}/>
                    <div className='w-75'>
                        <DisplayRowKV lbl='Name' valeur={
                            `${prop.obj.first_name} ${prop.obj.last_name}`
                        } />

                        <DisplayRowKV lbl='Speciality' valeur={prop.obj.specialite} />
                        <DisplayRowKV lbl='Hospital / clinic' valeur={prop.obj.hospital_name} />
                        <DisplayRowKV lbl='wilaya' valeur={prop.obj.wilaya} />
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className={'d-flex justify-content-around bg-'}>
                <DoctorInfoPopUp addr={prop.obj.address} />
                {!prop.admin ?<Button onClick={deleteHandler} className='btn-danger col-2'>Delete</Button>: <></> }


            </Card.Footer>
        </Card>
    )
}
export default DoctorCard