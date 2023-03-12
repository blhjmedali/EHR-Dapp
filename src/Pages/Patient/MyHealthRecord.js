import React from "react";
import DisplayRowKV from "../../Components/DisplayRowKV";
import DisplayList from "../../Components/DisplayList";

const MyHealthRecord = (prop) =>{

    const {bloodType,tol,mizan,medical_History,diagnostic_Tests,treatments,vision_testing}= undefined || prop.obj2




    return(
        <div className='bg-light p-4  rounded shadow-lg w-75'>
            <h4 className='text-primary '>My Health Records : </h4>


            <div className='p-4'>
                <h6  className='text-warning '><b>My Health Records :</b> </h6>
                <DisplayRowKV lbl='Blood Type' valeur={bloodType} />
                <DisplayRowKV lbl='Height' valeur= {tol.toString().concat(" cm")}/>
                <DisplayRowKV lbl='Weight' valeur={mizan.toString().concat(" kg")} />
                <DisplayRowKV lbl='BMI' valeur={(mizan/(tol/10)**2).toFixed(3)} />
                <DisplayRowKV lbl='Vision Testing' valeur={vision_testing} />
                <DisplayList lst={medical_History} titlee='My Medical History :' />
                <DisplayList lst={diagnostic_Tests} titlee='Diagnostic Tests :' />
                <DisplayList lst={treatments} titlee='My Treatments  :' />

            </div>
        </div>
    )
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