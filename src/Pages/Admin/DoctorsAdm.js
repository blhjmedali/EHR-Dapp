import React, {useState} from "react";
import img from "../../images/img_2.png";
import DisplayRowKV from "../../Components/DisplayRowKV";
import DoctorDisplayComponent from "./DoctorDisplayComponent";
import Form from "../../Components/Form";

function DoctorsAdm(){
    const[state , stateHandler]=useState('view')
    const doctorsObject = [
        {full_name:'Belhadj Mohamed Ali',specialite:'galb'  ,hospital_name:'hos1'   ,email:'blhj.medali@gmail'   ,addres:'Adrar'     ,numb:'066655789'},
        {full_name:'Aibout Sidahmed'    ,specialite:'ras'   ,hospital_name:'hos2'   ,email:'aibout23@gmail.com'   ,addres:'Adrar'     ,numb:'066655789'},
        {full_name:'Taha yacine '       ,specialite:'nayf'  ,hospital_name:'hos3'   ,email:'tahaofdm@gmail.com'   ,addres:'telemcen'  ,numb:'066655789'},
        {full_name:'Karim Toumi'        ,specialite:'nsa'   ,hospital_name:'hos4'   ,email:'kikokarim@gmail.com'   ,addres:'Adrar'     ,numb:'066655789'},
    ]
    const a_doc=doctorsObject.map((item ,index)=>{
        return <DoctorDisplayComponent key={index} objet={item} />
    })

    return(
        <>
            <h4 className='text-success '>Doctors : </h4>
            <div className='d-flex justify-content-around'>
                <button onClick={()=>{stateHandler('view')}} className='btn btn-success col-3 shadow-sm'>View Doctors</button>
                <button onClick={()=>{stateHandler('add')}} className='btn btn-secondary col-3 shadow-sm' >Add new Doctor</button>
            </div>
            <hr className="hr  "/>

            {state=='view' && a_doc}
            {state=='add' && <Form userType='doctor'/>}



        </>
    )
}

export default DoctorsAdm