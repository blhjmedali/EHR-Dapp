import React, {useEffect, useState} from "react";
import DisplayPationsRow from "../../Components/DisplayPationsRow";
import PatientCard from "./PatientCard";
import contoler from "../../controler";

const MyPatients = ()=>{
    const patients_array= [
        {numb :'1' ,patient_name:'BELHADJ Mohamed Ali' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
        {numb :'2' ,patient_name:'Bouras Taha Yacine' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
        {numb :'3' ,patient_name:'Aibout Sidahmed' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
    ]
    const [changed , chaHandler]=useState(false)
    const [pat_info , setPatinfo]= useState([])


    const changeProfile = async () =>{
        chaHandler(!changed)
    }

    useEffect(()=>{
        async function init(){
            let a = new contoler(window.ethereum.selectedAddress)

            let pat_addresses = (await a.getAddressesOfMyPatiens())

            const info=[]
            for (let i of pat_addresses){
                const obj = Object.assign({},{"address":i},await a.getPatieninfo(i))
                info.push(obj)
            }

            setPatinfo(info)
            //console.log('HI',pat_addresses, 'My Address' ,window.ethereum.selectedAddress )
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
                    return <PatientCard key ={index} fname={item.first_name} lname={item.last_name} wily={item.wilaya} addr={item.address}/>
                })
            }



        </>
    )
}

export default MyPatients