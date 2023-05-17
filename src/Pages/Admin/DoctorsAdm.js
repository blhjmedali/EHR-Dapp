import React, {useEffect, useState} from "react";

import DoctorDisplayComponent from "./DoctorDisplayComponent";
import Form from "../../Components/Form";
import controler from "../../controler";
import DoctorCard from "../Patient/DoctorCard";
import {FaUser} from "react-icons/fa";

import { BsPersonFillAdd } from "react-icons/bs";

function DoctorsAdm(){
    const[state , stateHandler]=useState('view')
    const [click,setClick]=useState(false)
    const doctorsObject = [
        {full_name:'Belhadj Mohamed Ali',specialite:'galb'  ,hospital_name:'hos1'   ,email:'blhj.medali@gmail'   ,addres:'Adrar'     ,numb:'066655789'},
        {full_name:'Aibout Sidahmed'    ,specialite:'ras'   ,hospital_name:'hos2'   ,email:'aibout23@gmail.com'   ,addres:'Adrar'     ,numb:'066655789'},
        {full_name:'Taha yacine '       ,specialite:'nayf'  ,hospital_name:'hos3'   ,email:'tahaofdm@gmail.com'   ,addres:'telemcen'  ,numb:'066655789'},
        {full_name:'Karim Toumi'        ,specialite:'nsa'   ,hospital_name:'hos4'   ,email:'kikokarim@gmail.com'   ,addres:'Adrar'     ,numb:'066655789'},
    ]
    const a_doc=doctorsObject.map((item ,index)=>{
        return <DoctorDisplayComponent key={index} objet={item} />
    })

    const [docCardInfo, setDocCardInfo] = useState([]);
    const [num , setNum]=useState()

    useEffect(()=>{
        const init = async () => {
            const a = new controler(window.ethereum.selectedAddress);
            const my_doctors = await a.getAllDoctorAddresses();
            const doctorCards = [];

            for (let i in my_doctors) {
                const obj = Object.assign({}, await a.getDoctorinfo(my_doctors[i]), { address: my_doctors[i] });
                doctorCards.push(obj);
            }
            setDocCardInfo(doctorCards);

            setNum(await a.getDoctorsCount())
        };

        init();
    },[click , state])


    return(
        <>
            <h4 className='text-dark '><b>Doctors : </b></h4><br/>
            <div className='d-flex justify-content-around'>
                <button onClick={()=>{stateHandler('view')}} className='btn btn-primary col-3 shadow-sm'>
                     View Doctors
                </button>

                <button onClick={()=>{stateHandler('add')}} className='btn btn-secondary col-3 shadow-sm' >
                    <BsPersonFillAdd/> Add new Doctor
                </button>

                <div className='p-1 shadow col-2 bg-primary text-center rounded-5 '>
                    <FaUser/> {num}
                </div>
            </div>
            <hr className="hr  "/>


            {state==='view' &&
                docCardInfo.map((value, index) => {
                    return <DoctorCard key={index} obj={value} admin={true} />
                })
                //a_doc
            }
            {state==='add' && <Form on={setClick} userType='doctor'/>}



        </>
    )
}

export default DoctorsAdm