import React, {useEffect, useState} from "react";
import DisplayRowKV from "../../Components/DisplayRowKV";


function MyInformation(prop){
    //const {first_name,last_name,birth_date,email,phone, wilaya ,wallet_key,join_date,hospital_name,specialite ,gender}= undefined || prop.obj

    const [info , infoHandler] = useState({})
    useEffect(()=>{
        infoHandler( prop.obj)
    })

    //console.log("MyInformation Component : ",info)

    return(
        <>
            <h4 className='text-primary '>My Informations : </h4>

            <div className='p-4'>
                <DisplayRowKV lbl='First Name' valeur={info.first_name} />
                <DisplayRowKV lbl='Last Name' valeur={info.last_name}/>
                {prop.isDoctor===false&& <DisplayRowKV lbl='Date of birth' valeur={info.birth_date}/>}
                {prop.isDoctor===true && <DisplayRowKV lbl='Speciality' valeur={info.specialite}/>}
                {prop.isDoctor===true && <DisplayRowKV lbl='Hospital / Clinic' valeur={info.hospital_name}/>}
                {prop.isDoctor===false&& <DisplayRowKV lbl='Gender' valeur={info.gender /*? "Male":"Female"*/}/>}
                <DisplayRowKV lbl='Email' valeur={info.email}/>
                <DisplayRowKV lbl='Adress' valeur={info.wilaya}/>
                <DisplayRowKV lbl='Phone Number' valeur={info.phone}/>
                <DisplayRowKV lbl='Joining date' valeur={info.join_date}/>
                <p className='text-dark d-flex justify-content-center pt-4'>
                    <i>{info.doctor_address}</i>
                    {/*<small className='text-muted'><i>{`Join in ${info.join_date}`}</i></small>*/}
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