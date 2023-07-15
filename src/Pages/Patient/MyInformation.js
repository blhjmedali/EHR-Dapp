import React, {useEffect, useState} from "react";
import DisplayRowKV from "../../Components/DisplayRowKV";



// This component is responsible for displaying informations
// get info as an object from parent component  <Doctor/> || <Patient/>


function MyInformation(prop){

    const [info , infoHandler] = useState({})

    // get object from parent component
    useEffect(()=>{
        infoHandler(prop.obj)
    })


    return(
        <>
            <h4 className='text-primary '>My Informations : </h4>

            <div className='p-4'>
                <DisplayRowKV lbl='First Name' valeur={info.first_name} />
                <DisplayRowKV lbl='Last Name'  valeur={info.last_name}/>
                {prop.isDoctor === false&& <DisplayRowKV lbl='Date of birth' valeur={info.birth_date}     />}
                {prop.isDoctor === true && <DisplayRowKV lbl='Speciality'    valeur={info.specialite}    />}
                {prop.isDoctor === true && <DisplayRowKV lbl='Hospital '     valeur={info.hospital_name}/>}
                {prop.isDoctor === false&& <DisplayRowKV lbl='Gender'        valeur={info.gender }     />}
                <DisplayRowKV lbl='Email'      valeur={info.email }/>
                <DisplayRowKV lbl='Adress' valeur={info.wilaya}/>
                <DisplayRowKV lbl='Phone Number' valeur={info.phone}/>
                <DisplayRowKV lbl='Joining date' valeur={info.join_date}/>
                <p className='text-dark d-flex justify-content-center pt-4'>
                    <i>{info.doctor_address}</i>
                </p>
            </div>
        </>
    )
}
MyInformation.defaultProps={
    fname:null,
    lname:null,
    bdate:null,
    email:null,
    num:null,
    wilaya:null,
    gen:null,
    join_date:null,
    wallet_key:null,
    isDoctor:null,
    hosptName:null,
    speciality:null,

}
export default MyInformation