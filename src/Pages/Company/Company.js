import React, {useEffect, useState} from "react";
import Body from "../../Components/Body";
import img_cnas from "../../images/Icon/img.png";
import img_casnos from "../../images/Icon/img_1.png";
import SideBar from "../../Components/SideBar";
import ContentContainer from "../../Components/ContentContainer";
import MyInformation from "../Patient/MyInformation";
import MyHealthRecord from "../Patient/MyHealthRecord";
import MyPatients from "../Doctor/MyPatients";
import MyCustomer from "./MyCustomer";
import contoler from "../../controler";
import DisplayRowKV from "../../Components/DisplayRowKV";
import {useNavigate} from "react-router-dom";

function Company() {
    const [comoany_nav_items]=useState([
        {id:'pation_nav_item1',navItemName:'About us'},
        {id:'pation_nav_item2',navItemName:'Customers'},
    ])
    const [selected,selectedHandler]=useState('pation_nav_item1')     // use state fiha var yedi string (selected item from sidebar)
    const [info , setInfo]=useState({})
    function getSelectedItem(event){
        // get selected item and store it in var (selected)
        comoany_nav_items.map((item)=> {
            if(event.target.id=== item.id){
                selectedHandler(item.id)
            }
        })
    }


    let a = new contoler(window.ethereum.selectedAddress)


    const [changed , chaHandler]=useState(false)
    window.ethereum.on('accountsChanged',()=>chaHandler(!changed))

    /////////////////////////////////////////////////// change Profile
    const navigate = useNavigate()
    const changeProfile = async () =>{
        const user_type =  await a.getUserType(window.ethereum.selectedAddress)
        chaHandler(!changed)
        if (user_type==="Admin"){
            navigate("/Admin")
        }

        if (user_type==="Doctor"){
            navigate("/Doctor")
        }

        if (user_type==="Patient"){
            navigate("/Patient")
        }
        if (user_type==="Company"){
            navigate("/Company")
        }
        if (user_type!="Admin"  && user_type!="Doctor"&& user_type!="Patient" && user_type!="Company"){
            navigate("/")
        }
    }
    window.ethereum.on('accountsChanged',changeProfile)
    ///////////////////////////////////////////////////
    useEffect(()=>{
            const init= async ()=>{
                const comp_info = await a.getCompanyinfo(window.ethereum.selectedAddress)
                setInfo(comp_info)
                console.log(info)

            }
            init()
        },[changed])

    return (
        <Body>
            <SideBar
                onClickInItem={getSelectedItem}
                title={info.company_name}
                aray={ comoany_nav_items}
                pic={info.company_name ==="CNAS"?img_cnas:img_casnos}
            />
            <ContentContainer type = 'company' >
                {selected==="pation_nav_item1" && <>

                    <DisplayRowKV lbl='Company name' valeur={info.company_name} />
                    <DisplayRowKV lbl='Location' valeur={info.location} />
                    <DisplayRowKV lbl='Number' valeur={info.number} />
                    <DisplayRowKV lbl='Email' valeur={info.email} />
                    <DisplayRowKV lbl='Website' valeur={info.website} />
                    <DisplayRowKV lbl='Description' valeur={info.description} />
                </> }


                {selected==="pation_nav_item2" && <MyCustomer/>  }
            </ContentContainer>

        </Body>
    )
}
export default Company