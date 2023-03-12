import React from "react";
import img from "../../images/img_2.png";
import DisplayRowKV from "../../Components/DisplayRowKV";
function DoctorDisplayComponent(prop){
    const obj = prop.objet

        return(
        <div  style={{backgroundColor:"#025e37", backgroundImage: "linear-gradient(135deg, #198654 6%, #025E37FF 90%)"}}
              className=' d-flex border shadow border-bottom rounded w-auto  m-3'>
            <img style={{ height:200}}className='  d-flex align-self-center' src={img}/>
            <div className=' row m-2 p-2 rounded bg-light'>
                <p className=' d-flex justify-content-center  text-muted'><i>0x2918aB4589a60fAE57161132d6951F832287e9a2</i></p>
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

