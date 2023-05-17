import React, {useEffect, useState} from "react";
import SideBar from "../../Components/SideBar";
import ContentContainer from "../../Components/ContentContainer";
import Body from "../../Components/Body";
import  img from '../../images/Pation.png'
import MyInformation from "./MyInformation";
import MyHealthRecord from "./MyHealthRecord";
import MyDoctors from "./MyDoctors";
import controler from "../../controler";
import {useNavigate} from "react-router-dom";
import CompanyCard from "../Company/CompanyCard";


const Patient=()=>{
    // UI
    const [patient_nav_items]=useState([
        {id:'pation_nav_item1',navItemName:'My Information'},
        {id:'pation_nav_item2',navItemName:'My Health Records'},
        {id:'pation_nav_item3',navItemName:'My Doctors'},
        {id:'pation_nav_item4',navItemName:'Assurance Company'}
    ])          // items li fi SideBar ta3 patient (list of object )
    const [selected,selectedHandler]=useState('pation_nav_item1')     // use state fiha var yedi string (selected item from sidebar)
    const [changed , chaHandler]=useState()
    function getSelectedItem(event){
        // get selected item and store it in var (selected)
        patient_nav_items.map((item)=> {
            if(event.target.id=== item.id){
                selectedHandler(item.id)
            }
        })
    }


    // Back
    const [sender , setSender] = useState()
    const a = new controler(sender)
    const [patientInfo, setpatientInfo] = useState({});    // MyInformation

    const [compAddr , setCompAdr]=useState({cnas:'0x7cC31808e194EBb20429DF1FCC8056aa18062835',casnos:'0xA3bd68241A59379646109a7b399450d3E8dA1FD8'})

    useEffect(()=>{
        const init = async ()=> {
            setSender(window.ethereum.selectedAddress)
            setpatientInfo( await a.getPatieninfo(window.ethereum.selectedAddress) )
            //console.log(patientInfo)

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


    return(

            <Body>
                <SideBar onClickInItem={getSelectedItem}
                         title={'Patient'}
                         aray={ patient_nav_items}
                         pic={img}
                         name={patientInfo.first_name +" "+ patientInfo.last_name}
                />

                <ContentContainer type = 'patient' >
                    {/*                  orientation based on selected item                   */}
                        {selected==="pation_nav_item1" && <MyInformation obj={patientInfo} isDoctor={false} />}
                    {selected==="pation_nav_item2" && <MyHealthRecord/> }
                    {selected==="pation_nav_item3" && <MyDoctors changed={changed} /> }
                    {selected==="pation_nav_item4" &&
                        <div className='d-flex p-2'>
                            <CompanyCard name="CNAS"   addr={compAddr.cnas} />
                            <CompanyCard name="CASNOS" addr={compAddr.casnos} />
                        </div>}
                </ContentContainer>

            </Body>
    )
}
export default Patient