import React, {useState} from "react";
import Body from "../../Components/Body";
import SideBar from "../../Components/SideBar";
import ContentContainer from "../../Components/ContentContainer";
import levi from '../../images/img.png'
import PatientsAdm from "./PatientsAdm";
import DoctorsAdm from "./DoctorsAdm";
import controler from "../../controler";
import {useNavigate} from "react-router-dom";

const Admin=()=>{


    const[selected_nav_item,selectedHandler]=useState('1')
    const admin_nav_items=[
        {id:'1',navItemLink:'#',navItemName:'Patiens'},
        {id:'2',navItemLink:'#',navItemName:'Doctors'},
        {id:'3',navItemLink:'#',navItemName:'Log out'}
    ]
    function getSelectedItem(event){
        admin_nav_items.map((item)=> {
            if(event.target.id=== item.id){
                selectedHandler(item.id)
            }
        })
    }


    /////////////////////////////////////////////////// change Profile
    let sender = window.ethereum.selectedAddress
    const a = new controler(sender)
    const navigate = useNavigate()
    const getUserType = async () =>{
        const user_type =  await a.getUserType(window.ethereum.selectedAddress)
        if (user_type==="Admin"){
            console.log("Admin")
            navigate("/Admin")
        }

        if (user_type==="Doctor"){
            console.log("Doctor")
            navigate("/Doctor")
        }

        if (user_type==="Patient"){
            console.log("Patient")
            navigate("/Patient")
        }
    }
    window.ethereum.on('accountsChanged',getUserType)
    ///////////////////////////////////////////////////


    return(
        <Body>
            <SideBar title='Admin' aray={admin_nav_items} pic={levi}onClickInItem={getSelectedItem}/>
            <ContentContainer type = 'admin'>

                {selected_nav_item=='1' && <PatientsAdm/> }
                {selected_nav_item=='2' && <DoctorsAdm /> }



            </ContentContainer>
        </Body>
    )
}


export default Admin
