import React from "react";
import {Card} from "react-bootstrap";
import img from "../../images/img_2.png";
import DisplayRowKV from "../../Components/DisplayRowKV";
import Button from "react-bootstrap/Button";
import DoctorInfoPopUp from "./DoctorInfoPopUp";
import controler from "../../controler";

const DoctorCard = (prop)=> {

    //const [first_name , last_name]=prop.obj
    //console.log(prop.obj)

    const color ="dark"

    const deleteHandler = async () =>{
        const sender = window.ethereum.selectedAddress;
        const doc_addr = prop.obj.address
        const a = new controler(sender);
        await a.disapproveDoctor(doc_addr , sender);
        //window.location.reload()
        prop.f5()

    }

    return(
        <Card className='m-3 ' >
            <Card.Header className={`d-flex justify-content-center text-light bg-${color}`}>
                <small><i>{prop.obj.address}</i></small>
            </Card.Header>
            <Card.Body>
                <div className='d-flex'>
                    <Card.Img className={`w-25  align-items-center h-100 bg-${""}`} src={img}/>
                    <div className='bg-light w-75'>
                        <DisplayRowKV lbl='Name' valeur={
                            `${prop.obj.first_name} ${prop.obj.last_name}`
                        } />

                        <DisplayRowKV lbl='Speciality' valeur={prop.obj.specialite} />
                        <DisplayRowKV lbl='Hospital / clinic' valeur={prop.obj.hospital_name} />
                        <DisplayRowKV lbl='wilaya' valeur={prop.obj.wilaya} />
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className='d-flex justify-content-around'>
                <DoctorInfoPopUp addr={prop.obj.address} />
                <Button onClick={deleteHandler} className='btn-danger col-2'>Delete</Button>

            </Card.Footer>
        </Card>
    )
}
export default DoctorCard