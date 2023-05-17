import React, {useEffect, useState} from "react";
import PatiensListComponent from "../Doctor/PatiensListComponent";
import Form from "../../Components/Form";
import {FaUser} from "react-icons/fa";
import contoler from "../../controler";

function PatientsAdm(){

    const patients_array= [
        {numb :'1' ,patient_name:'BELHADJ Mohamed Ali' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
        {numb :'2' ,patient_name:'Bouras Taha Yacine' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
        {numb :'3' ,patient_name:'Aibout Sidahmed' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
        {numb :'4' ,patient_name:'Kaid Sliman' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
    ]
    const[state , stateHandler]=useState('view')

    const [click,setClick]=useState(false)
    const [num , setNum]=useState()
    let a = new contoler(window.ethereum.selectedAddress)

    useEffect(()=>{
        async function init() {
            const pc =await a.getPatiensCount()
            const dc =await a.getDoctorsCount()

            setNum(pc)

        }
        init()
    },[click , state])




    return(
        <>
            <h4 className='text-dark '><b>Patient : </b></h4><br/>
            <div className='d-flex justify-content-around '>
                <button onClick={()=>{stateHandler('view')}} className='btn btn-primary col-3 shadow-sm'>View Patient</button>
                <button onClick={()=>{stateHandler('add')}} className='btn btn-secondary col-3 shadow-sm' >Add new Patient</button>
            </div>

            <hr className="hr  "/>

            {state==='view'?
                <div className='w-50   d-flex justify-content-around align-content-center  '>
                    <h5>Number of Patients :  </h5>
                    <div className='p-1 shadow w-25 bg-primary text-center rounded-5 '>
                         <FaUser/> {num}
                    </div>
                </div> :<Form on={setClick} userType='patient'/> }

        </>
    )
}

export default PatientsAdm