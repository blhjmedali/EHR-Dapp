import React, {useEffect, useState} from "react";
import PatientCard from "./PatientCard";
import contoler from "../../controler";

// This component is responsible for displaying a dorctor patients
// Parent component <Doctor/>
const MyPatients = ()=>{

    const [changed , chaHandler]=useState(false)
    const [pat_info , setPatinfo]= useState([])


    const changeProfile = async () =>{
        chaHandler(!changed)
    }

    useEffect(()=>{
        async function init(){
            // create new instance of controller
            let a = new contoler(window.ethereum.selectedAddress)

            // get from backend addresses of my patients
            let pat_addresses = (await a.getAddressesOfMyPatiens())

            // get informations of each one of those adresses
            const info=[]
            for (let i of pat_addresses){
                const obj = Object.assign({},{"address":i},await a.getPatieninfo(i))
                info.push(obj)
            }

            // store those infos in an array of object ( pat_info )
            setPatinfo(info)
        }
        init()
    },[changed])

    window.ethereum.on('accountsChanged',changeProfile)



    return(
        <>
            <h4 className='text-dark '><b>My Patiens : </b></h4>
            <hr className="hr shadow"/>
            {
                pat_info.map( (item, index)=>{
                    return <PatientCard key ={index} fname={item.first_name} lname={item.last_name} wily={item.wilaya} addr={item.address} doc={true}/>
                })
            }
        </>
    )
}

export default MyPatients