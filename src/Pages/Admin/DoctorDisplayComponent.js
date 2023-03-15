import React from "react";
import img from "../../images/img_2.png";
import DisplayRowKV from "../../Components/DisplayRowKV";
function DoctorDisplayComponent(prop){
    const obj    = prop.objet
    const style = {backgroundColor:"#26a5fd", backgroundImage: "linear-gradient(135deg, #26a5fd 6%, #80D0C7 90%)"}

    const style2 = {backgroundColor: "rgba(13,110,252,0.75)"}
        return(

            <div style={style} className=' row m-2 p-2 rounded  shadow'>
                <p className=' d-flex justify-content-center  text-light'><i>0x2918aB4589a60fAE57161132d6951F832287e9a2</i></p>
                <div  style={style} className='  rounded w-100 '>
                    <DisplayRowKV lbl='Full name'         valeur={obj.full_name} />
                    <DisplayRowKV lbl='Speciality'        valeur={obj.specialite} />
                    <DisplayRowKV lbl='Hospital / Clinic' valeur={obj.hospital_name} />
                    <DisplayRowKV lbl='Email'             valeur={obj.email} />
                    <DisplayRowKV lbl='Adress'            valeur={obj.addres} />
                    <DisplayRowKV lbl='Phone Number'      valeur={obj.numb} />
                </div>
            </div>

    )
}

export default DoctorDisplayComponent

