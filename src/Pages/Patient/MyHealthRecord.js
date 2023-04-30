import React, {useEffect, useState} from "react";
import DisplayRowKV from "../../Components/DisplayRowKV";
import DisplayList from "../../Components/DisplayList";
import controler from "../../controler";

const MyHealthRecord = (prop) =>{

    const [height  , setHeight ] = useState()
    const [weight  , setWeight ] = useState()
    const [blood  , setBloodType ] = useState()
    const [vision  , setVision ] = useState()

    const [medical_History  , setMedicalHistory ] = useState([])
    const [diagnostic_Tests , setDiagnosticTests] = useState([])
    const [treatments       , setTreatments     ] = useState([])


    const a = new controler(window.ethereum.selectedAddress)                               // Controler instance

    useEffect(()=>{
        async function init(){
            const MedicalRecordinfo = await a.getMedicalRecordinfo(window.ethereum.selectedAddress)

            setHeight(MedicalRecordinfo.height)
            setWeight(MedicalRecordinfo.weight)
            setBloodType(MedicalRecordinfo.blood_type)
            setVision(MedicalRecordinfo.vision_test)

            setMedicalHistory (MedicalRecordinfo.medical_history)
            setDiagnosticTests (MedicalRecordinfo.diagnostic_tests)
            setTreatments (MedicalRecordinfo.treatments)

            console.log(MedicalRecordinfo)



        }

        init()

    },[])


    return(
            <>
                <h4 className='text-primary '>My Health Records : </h4>


                <div className='p-4'>
                    <h6  className='text-warning '><b>My Health Records :</b> </h6>
                    <DisplayRowKV lbl='Blood Type' valeur={blood} />
                    <DisplayRowKV lbl='Height' valeur= {height}/>
                    <DisplayRowKV lbl='Weight' valeur={weight} />
                    <DisplayRowKV lbl='BMI' valeur={calculateBMI(height,weight)} />
                    <DisplayRowKV lbl='Vision Testing' valeur={vision} />
                    <DisplayList lst={medical_History}   titlee='My Medical History :' editable={false} />
                    <DisplayList lst={diagnostic_Tests}  titlee='Diagnostic Tests :'   />
                    <DisplayList lst={treatments}        titlee='My Treatments  :'     />

                </div>
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
MyHealthRecord.defaultProps={
    bloodType:null,
    tol:null,
    mizan:null,
    medical_History:null,
    diagnostic_Tests:null,
    treatments:null,
    vision_testing:null,
}
export default MyHealthRecord