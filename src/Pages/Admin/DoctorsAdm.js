import React, {useEffect, useState} from "react";
import Form from "../../Components/Form";
import controler from "../../controler";
import DoctorCard from "../Patient/DoctorCard";
import {FaUser} from "react-icons/fa";

import { BsPersonFillAdd } from "react-icons/bs";

// this component from Admin dashboard is responsible of view and create new doctors

function DoctorsAdm(){

    // UI
    const[state , stateHandler]=useState('view')
    const [click,setClick]=useState(false)
    const [docCardInfo, setDocCardInfo] = useState([]);
    const [num , setNum]=useState()

    useEffect(()=>{
        const init = async () => {
            // create new instance of controller
            const a = new controler(window.ethereum.selectedAddress);

            // get from backend addresses of all doctors
            const my_doctors = await a.getAllDoctorAddresses();

            // get informations of each one of those adresses

            const doctorCards = [];
            for (let i in my_doctors) {
                const obj = Object.assign({}, await a.getDoctorinfo(my_doctors[i]), { address: my_doctors[i] });
                doctorCards.push(obj);
            }

            // store those infos
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
            }
            {state==='add' && <Form on={setClick} userType='doctor'/>}



        </>
    )
}

export default DoctorsAdm