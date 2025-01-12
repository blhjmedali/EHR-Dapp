import React from "react";
import {Card, Image} from "react-bootstrap";
import img2 from "../../images/background/vecteezy_3d-render-hand-carrying-heart_13091288_470.png";
import DisplayRowKV from "../../Components/DisplayRowKV";
import ViewPatientPopup from "./ViewPatientPopup";

// this component is responsible of displaying a single card of user
// it'll be user in <Doctor/> => <MyPatients/>
function PatientCard(prop) {
    return(
        <Card className='m-3 shadow-sm border-0'>
            <Card.Header className='bg-secondary'>
                <small className='text-white d-flex justify-content-center '>
                    {prop.addr}
                </small>
            </Card.Header>
            <Card.Body className='d-flex '>
                <Image className={`w-25  align-items-right  bg-${""}`} src={img2}/>

                <div className=' w-75 p-3'>
                    <DisplayRowKV lbl='First Name' valeur={prop.fname} />
                    <DisplayRowKV lbl='Last Name' valeur={prop.lname} />
                    <DisplayRowKV lbl='Wilaya' valeur={prop.wily} />
                </div>


                <ViewPatientPopup address={prop.addr} doc={prop.doc} />


            </Card.Body>

        </Card>
    )
}

export default PatientCard