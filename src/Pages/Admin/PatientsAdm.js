import React, {useEffect, useState} from "react";
import Form from "../../Components/Form";
import {FaUser} from "react-icons/fa";
import contoler from "../../controler";


// this component from Admin dashboard is responsible of creating new patients
function PatientsAdm(){

    // UI
    const [state , stateHandler]=useState('view')
    const [click,setClick]=useState(false)
    const [num , setNum]=useState()

    // Backend
    let a = new contoler(window.ethereum.selectedAddress)
    useEffect(()=>{
        async function init() {
            // Get num of patients
            const pc =await a.getPatiensCount()
            setNum(pc)
        }
        init()
    },[click , state])


    return(
        <>
            <h4 className='text-dark '><b>Patient : </b></h4><br/>
            <div className='d-flex justify-content-around '>
                <button onClick={()=>{stateHandler('view')}} className='btn btn-primary col-3 shadow-sm'   >View Patient</button>
                <button onClick={()=>{stateHandler('add')}}  className='btn btn-secondary col-3 shadow-sm' >Add new Patient</button>
            </div>

            <hr className="hr  "/>

            {state==='view'?
                // Display num of patients
                <div className='w-50   d-flex justify-content-around align-content-center  '>
                    <h5>Number of Patients :  </h5>
                    <div className='p-1 shadow w-25 bg-primary text-center rounded-5 '>
                         <FaUser/> {num}
                    </div>
                </div> :

                // Display form to add new patient
                <Form on={setClick} userType='patient'/> }

        </>
    )
}

export default PatientsAdm