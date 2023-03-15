import React, {useState} from "react";
import Body from "../../Components/Body";
import SideBar from "../../Components/SideBar";
import ContentContainer from "../../Components/ContentContainer";
import levi from '../../images/img.png'
import PatientsAdm from "./PatientsAdm";
import DoctorsAdm from "./DoctorsAdm";

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
