import React, {useState} from "react";
import Body from "../../Components/Body";
import SideBar from "../../Components/SideBar";
import img from '../../images/Doctor.png'
import ContentContainer from "../../Components/ContentContainer";
import MyInformation from "../Patient/MyInformation";
import MyPatients from "./MyPatients";
import MyDoctors from "../Patient/MyDoctors";


const Doctor=()=>{

    const doctor_nav_items=[
        {id:'doctor_nav_itm_1',navItemLink:'#',navItemName:'My Information'},
        {id:'doctor_nav_itm_2',navItemLink:'#',navItemName:'My patient'},
        {id:'doctor_nav_itm_3',navItemLink:'#',navItemName:'Sign out'}
    ]        // items li fi SideBar ta3 patient (list of object )
    const doctor_info= {
        fname:'Doctor Name',
        lname:'asdasd ',
        join_date:'25/10/2023',
        email:'doc@gmail.com ',
        num:'0655332288',
        wilaya:'oran',
        gen:false,
        isDoctor:true,
        wallet_key:"0x2918aB4589a60fAE57161132d6951F832287e9a2",
        hosptName:'Goudjil',
        speciality : 'Generalist',
    }          // les information ta3 doctor ( one object )

    const[selected,selectedHandler]=useState('doctor_nav_itm_1')

    function getSelectedItem(event){
        doctor_nav_items.map((item)=> {
            if(event.target.id=== item.id){
                selectedHandler(item.id)
            }
        })
    }
    return(
        <Body>
            <SideBar title="Doctor" onClickInItem={getSelectedItem} aray={doctor_nav_items} pic={img} />
            <ContentContainer type = 'doctor'>
                {selected==='doctor_nav_itm_1'&&<MyInformation obj={doctor_info}/>}
                {selected==='doctor_nav_itm_2'&&<MyPatients/>}
            </ContentContainer>

        </Body>
    )
}



export default Doctor