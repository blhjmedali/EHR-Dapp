import React, {useEffect, useState} from "react";
import Body from "../../Components/Body";
import SideBar from "../../Components/SideBar";
import img from '../../images/Doctor.png'
import ContentContainer from "../../Components/ContentContainer";
import MyInformation from "../Patient/MyInformation";
import MyPatients from "./MyPatients";
import controler from "../../controler";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";



const Doctor= ()=>{
    // UI
    const[selected,selectedHandler]=useState('doctor_nav_itm_1')
    const doctor_nav_items=[
        {id:'doctor_nav_itm_1',navItemLink:'#',navItemName:'My Information'},
        {id:'doctor_nav_itm_2',navItemLink:'#',navItemName:'My patient'},
        {id:'doctor_nav_itm_3',navItemLink:'#',navItemName:'Sign out'}
    ]        // items li fi SideBar ta3 patient (list of object )
    const [changed , chaHandler]=useState()


    // Back
    const [sender , setSender]=useState()
    const a = new controler(sender)
    const [doctorInfo, setDoctorInfo] = useState({});

    useEffect(()=>{
        const init = async ()=> {
            setSender(window.ethereum.selectedAddress)
            setDoctorInfo( await a.getDoctorinfo(window.ethereum.selectedAddress) )
            //toast.success("Welcome "+doctorInfo.first_name,{position: "top-left" , theme: "dark"})
        }

        init()

    },[changed])

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

    function getSelectedItem(event){
        doctor_nav_items.map((item)=> {
            if(event.target.id=== item.id){
                selectedHandler(item.id)
            }
        })
    }

    return(
        <Body>
            <SideBar title="Doctor" onClickInItem={getSelectedItem} aray={doctor_nav_items} pic={img}
                     name={doctorInfo.first_name+" "+doctorInfo.last_name}/>
            <ContentContainer type = 'doctor'>
                {selected==='doctor_nav_itm_1'&&<MyInformation obj={doctorInfo} isDoctor={true}/>}
                {selected==='doctor_nav_itm_2'&&<MyPatients/>}
            </ContentContainer>
        </Body>
    )
}



export default Doctor