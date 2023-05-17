import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {TiChevronRight} from "react-icons/ti";
import DisplayRowKV from "../../Components/DisplayRowKV";
import DisplayList from "../../Components/DisplayList";
import controler from "../../controler";
import {CloseButton, Form, ToggleButton} from "react-bootstrap";


function ViewPatientPopup(prop) {

    // UI
    const [show, setShow] = useState(false)
    const [editable , setEditable] = useState(false)
    const [checked , setChecked] = useState(false)

    const handleClose = () => {setShow(false);setEditable(false)}
    const handleShow = () => setShow(true);
    // Back               // get Info from Backend
    const a = new controler(window.ethereum.selectedAddress)                               // Controler instance
    const [patientInfo, setpatientInfo] = useState({});                         // Ma ttbadalch ( read only )
    useEffect(()=>{
        const init = async ()=> {
            setpatientInfo( await a.getPatieninfo(prop.address) )
            //setMedicalRecord( await a.getMedicalRecordinfo(prop.address) )
            const MedicalRecordinfo = await a.getMedicalRecordinfo(prop.address)
            console.log(MedicalRecordinfo)
            setHeight(MedicalRecordinfo.height)
            setWeight(MedicalRecordinfo.weight)
            setBloodType(MedicalRecordinfo.blood_type)
            setVision(MedicalRecordinfo.vision_test)

            setMedicalHistory (MedicalRecordinfo.medical_history)
            setDiagnosticTests (MedicalRecordinfo.diagnostic_tests)
            setTreatments (MedicalRecordinfo.treatments)
            // awal mara ycree medical record

        }
        init()
    },[])

    /////////////////////////////////////////////////////////'

    //   to update Medical record ( take those vars from user and push it to backend using CreateMedicalRecord() )
    const [height  , setHeight ] = useState()
    const [weight  , setWeight ] = useState()
    const [blood  , setBloodType ] = useState()
    const [vision  , setVision ] = useState()

    const [medical_History  , setMedicalHistory ] = useState([])
    const [diagnostic_Tests , setDiagnosticTests] = useState([])
    const [treatments       , setTreatments     ] = useState([])


    /////////////////////////////////////////////////////////'


    async function saveBTN(){

        const obj={
            patient_address:prop.address,
            height:height,
            weight:weight,
            blood_type:blood,
            vision_test:vision,

            medical_history:medical_History,
            diagnostic_tests:diagnostic_Tests,
            treatments:treatments
        }

        console.log("From user",obj)


        try{
            await a.createMedicalRecord(window.ethereum.selectedAddress,obj)
            setShow(false)
        }catch (e) {
            console.log(e)
        }
    }









    return(
        <>
            <Button onClick={handleShow} className='align-self-end ' variant="outlined"  >
                <TiChevronRight className='carousel-control-next-icon '/>
            </Button>


            <Modal  show={show} onHide={handleClose}  size='lg' >
                <Modal.Header closeButton   className='bg-dark text-white' >
                    <Modal.Title>Patient Information</Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    <div className=' bg-light rounded m-2 p-2 '>
                        <p className='text-danger border-bottom  p-2 text-center w-100 h-100'>
                            <small>{prop.address}</small>
                        </p>
                        <DisplayRowKV  lbl= "First Name" valeur={patientInfo.first_name} />
                        <DisplayRowKV lbl= "Last Name" valeur={patientInfo.last_name} />
                        <DisplayRowKV lbl= "Email " valeur={patientInfo.email} />
                        <DisplayRowKV lbl= "Wilaya " valeur={patientInfo.wilaya} />
                        <DisplayRowKV lbl= "Birth_date " valeur={patientInfo.birth_date} />
                        <DisplayRowKV lbl= "Phone " valeur={patientInfo.phone} />
                        <DisplayRowKV lbl= "Gender " valeur={patientInfo.gender} />

                    </div>
                    <hr className="hr"/>
                    <Modal.Title className='m-3 text-danger' > Medical Record :</Modal.Title>


                    {prop.doc?
                        <Form.Check className=' d-flex justify-content-center  w-25 p-2'
                                    type="switch" label="Edit" onChange={()=>setEditable(!editable)}
                                    checked={editable}
                        />:<></>
                    }



                    <div className=' bg-light shadow rounded m-2 p-2'>




                        <DisplayRowKV isDoctor={true} setValue={setHeight} type='h' editable={editable} lbl= "Height " valeur={height} />
                        <DisplayRowKV isDoctor={true} setValue={setWeight} type='w' editable={editable} lbl= "Weight " valeur={weight} />
                        <div className='  d-flex p-2 w-75   '>
                            <label className='w-50  d-flex '><b> Blood Type </b></label>
                            <div className="vr d-flex justify-content-center "></div>
                            {!editable ?
                                <label className='w-50 d-flex offset-1'> {blood} </label> :
                                <select className='form-select w-50 offset-1' onChange={(e)=>{setBloodType(e.target.value)}}  value={blood}>
                                    <option value= 'A+'>A+</option>
                                    <option value= 'A-'>A-</option>
                                    <option value= 'B+'>B+</option>
                                    <option value= 'B-'>B-</option>
                                    <option value= 'O+'>O+</option>
                                    <option value= 'O-'>O-</option>
                                    <option value= 'AB+'>AB+</option>
                                    <option value= 'AB-'>AB-</option>
                                </select>
                            }
                        </div>

                        <DisplayRowKV isDoctor={true} setValue={setVision} editable={editable}  valeur={vision} type='v'lbl= "Vision " />
                        <DisplayRowKV isDoctor={true} editable={false}    lbl= "BMI"         valeur={calculateBMI(height,weight)} />

                        <DisplayList titlee = 'My Medical History :' setList={setMedicalHistory}  editable={editable} lst={medical_History}   />
                        <DisplayList titlee = 'Diagnostic Tests :'   setList={setDiagnosticTests} editable={editable} lst={diagnostic_Tests}  />
                        <DisplayList titlee = 'My Treatments  :'     setList={setTreatments}      editable={editable} lst={treatments}        />
                    </div>



                </Modal.Body>
                <Modal.Footer>

                    <Button onClick={handleClose} className='btn-secondary col-2' >Close </Button>
                    {prop.doc ?<Button onClick={saveBTN} disabled={!editable} className='col-2 btn-success' >Save </Button>:<></>}

                </Modal.Footer>
            </Modal>
        </>
    )
}

function calculateBMI(h , w) {
    let height = parseInt(h)
    let weight = parseInt(w )
    const heightMeters = height / 100;
    const bmi = weight / (heightMeters * heightMeters);
    return bmi.toFixed(2);
}

export default ViewPatientPopup