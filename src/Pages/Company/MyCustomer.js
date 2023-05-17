import React, {useEffect, useState} from "react";
import DisplayPationsRow from "../../Components/DisplayPationsRow";
import PatientCard from "../Doctor/PatientCard";
import contoler from "../../controler";

const MyCustomer = ()=>{

    const [changed , chaHandler]=useState(false)
    const [cus_info , setCusinfo]= useState([])


    const changeProfile = async () =>{
        chaHandler(!changed)
    }

    useEffect(()=>{
        async function init(){

            let a = new contoler(window.ethereum.selectedAddress)
            let cus_addresses = (await a.getAddressesOfMyCustomers())
            console.log(cus_addresses)
            const info=[]
            for (let i of cus_addresses){
                const obj = Object.assign({},{"address":i},await a.getPatieninfo(i))
                info.push(obj)
            }
            setCusinfo(info)
            //console.log('HI',pat_addresses, 'My Address' ,window.ethereum.selectedAddress )
        }
        init()
    },[changed])



    window.ethereum.on('accountsChanged',changeProfile)



    return(
        <>
            <h4 className='text-dark '><b>Customer : </b></h4>
            <hr className="hr shadow"/>

            {
                cus_info.map( (item, index)=>{
                    return <PatientCard key ={index} fname={item.first_name} lname={item.last_name} wily={item.wilaya} addr={item.address} doc={false}/>
                })
            }



        </>
    )
}

export default MyCustomer