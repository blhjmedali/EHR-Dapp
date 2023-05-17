import React, {useEffect, useState} from "react";
import {IoIosAddCircle, IoIosRemoveCircle} from "react-icons/io";
import controler from "../../controler";
import DisplayRowKV from "../../Components/DisplayRowKV";
import contoler from "../../controler";

function CompanyCard(prop) {
    const color = ()=> prop.name==="CASNOS" ?"primary":"warning"

    const a = new controler(window.ethereum.selectedAddress)

    async function removeBTN() {
        await a.disAllow(prop.addr,window.ethereum.selectedAddress)
    }
    async function addBTN() {
        await a.allow(prop.addr,window.ethereum.selectedAddress)
    }

    const [info , setInfo]=useState({})

    useEffect(()=>{
        const init= async ()=>{
            let a = new contoler(window.ethereum.selectedAddress)
            const comp_info = await a.getCompanyinfo(prop.addr)
            setInfo(comp_info)
            console.log(info)
        }
        init()
    },[])


    return(
        <div className= {`bg-${color()} w-50 small   rounded-4 m-1`}>
            <div className='d-flex justify-content-around text-center' >
                <button className='btn'>
                    <h1 className='m-2'>{prop.name}</h1>
                </button>

                <div className='m-3 d-flex'>
                    <button className='btn' onClick={removeBTN}><IoIosRemoveCircle className='navbar-toggler-icon text-danger' /></button>
                    <button className='btn' onClick={addBTN}><IoIosAddCircle    className='navbar-toggler-icon text-success'/></button>
                </div>
            </div>
            <DisplayRowKV lbl='Company name' valeur={info.company_name} />
            <DisplayRowKV lbl='Location' valeur={info.location} />
            <DisplayRowKV lbl='Number' valeur={info.number} />
            <DisplayRowKV lbl='Email' valeur={info.email} />
            <DisplayRowKV lbl='Website' valeur={info.website} />
            <DisplayRowKV lbl='Description' valeur={info.description} />
        </div>

    )
}
export default CompanyCard