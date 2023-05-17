import React, {useEffect, useState} from "react";
import DisplayPationsRow from "../../Components/DisplayPationsRow";
import {Card} from "react-bootstrap";
import { FaUser} from "react-icons/fa";
import contoler from "../../controler";


const PatiensListComponent = (prop)=>{
    const line =prop.patients_array.map((item,ind)=>{
        return <DisplayPationsRow key={ind} patient_name={item.patient_name} numb={item.numb} wallet={item.wallet}/>
    })
    // const [addresses , setAddresses]=useState([])

    let a = new contoler(window.ethereum.selectedAddress)

    useEffect(()=>{
        async function init() {
            console.log('Patient : '+await a.getPatiensCount())
            console.log('Doctor : '+await a.getDoctorsCount())
        }
        init()
    },[])


    return(
        <div className='w-25  d-flex justify-content-center align-content-center  '>
            <div className='p-1 shadow w-50 bg-primary text-center rounded-5 '>
                    <FaUser/> 22
            </div>
        </div>
    )
}
export default PatiensListComponent