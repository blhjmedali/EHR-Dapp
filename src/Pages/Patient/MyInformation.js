import React from "react";
import DisplayRowKV from "../../Components/DisplayRowKV";

const MyInformation = (prop)=>{
    const {fname,lname,bdate,email,num, wilaya ,wallet_key,join_date,hosptName,speciality,isDoctor ,gen}= undefined || prop.obj
    return(
        <>
            <h4 className='text-primary '>My Informations : </h4>

            <div className='p-4'>
                <DisplayRowKV lbl='First Name' valeur={fname} />
                <DisplayRowKV lbl='Last Name' valeur={lname}/>
                {isDoctor===false&& <DisplayRowKV lbl='Date of birth' valeur={bdate}/>}
                {isDoctor===true && <DisplayRowKV lbl='Speciality' valeur={speciality}/>}
                {isDoctor===true && <DisplayRowKV lbl='Hospital / Clinic' valeur={hosptName}/>}
                {isDoctor===false&& <DisplayRowKV lbl='Gender' valeur={gen ? "Male":"Female"}/>}
                <DisplayRowKV lbl='Email' valeur={email}/>
                <DisplayRowKV lbl='Adress' valeur={wilaya}/>
                <DisplayRowKV lbl='Phone Number' valeur={num}/>
                <DisplayRowKV lbl='Joining date' valeur={join_date}/>
                <p className='text-secondary d-flex justify-content-center pt-4'>
                    <i>{wallet_key}</i>
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