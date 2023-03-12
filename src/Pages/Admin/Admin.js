import React, {useState} from "react";
import Body from "../../Components/Body";
import SideBar from "../../Components/SideBar";
import ContentContainer from "../../Components/ContentContainer";
import levi from '../../images/levi.png'
import img2 from '../../images/img.png'
import PatiensListComponent from'../Doctor/PatiensListComponent'
import FormInputRow from "./FormInputRow";
import Form from "../../Components/Form";
import PatientsAdm from "./PatientsAdm";
import DoctorsAdm from "./DoctorsAdm";


const Admin=()=>{

    const[selected_nav_item,selectedHandler]=useState('1')
    const admin_nav_items=[
        {id:'1',navItemLink:'#',navItemName:'Doctors'},
        {id:'2',navItemLink:'#',navItemName:'Patiens'},
        {id:'3',navItemLink:'#',navItemName:'Log out'}
    ]
    function getSelectedItem(event){
        admin_nav_items.map((item)=> {
            if(event.target.id=== item.id){
                selectedHandler(item.id)
                console.log(item.id)
            }
        })
    }



    return(
        <Body>
            <SideBar title='Admin' aray={admin_nav_items} pic={levi}onClickInItem={getSelectedItem}/>
            <ContentContainer>
                <div className=' bg-light p-4  rounded shadow '>
                    {selected_nav_item=='1' && <PatientsAdm/> }
                    {selected_nav_item=='2' && <DoctorsAdm /> }

                </div>

            </ContentContainer>
        </Body>
    )
}


export default Admin
