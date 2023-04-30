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
import Loading from "../../Components/Loading";

const Patient=()=>{
    // UI
    const [patient_nav_items]=useState([
        {id:'pation_nav_item1',navItemName:'My Information'},
        {id:'pation_nav_item2',navItemName:'My Health Records'},
        {id:'pation_nav_item3',navItemName:'My Doctors'},
        {id:'pation_nav_item4',navItemName:'Sign out'}
    ])          // items li fi SideBar ta3 patient (list of object )
    const medical_records= {
        bloodType:'O+',
        tol:170,
        mizan:100,
        vision_testing:10,
        medical_History:['History of smoking, quit 2 years ago','Hypertension, well controlled on lisinopril 20mg daily'],
        diagnostic_Tests:['Chest X-ray: Bilateral infiltrates consistent with pneumonia.','COVID-19 test: Negative.'],
        treatments:['Azithromycin 500mg daily for 5 days',
            'Albuterol inhaler every 4-6 hours as needed for shortness of breath',
            'Increased fluid intake and rest','Follow-up appointment in 1 week to reassess symptoms and response to treatment.'
        ]
    }        // medical records ta3 patient ( one object )
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
    const navigate = useNavigate()


    // Back
    const [sender , setSender] = useState()
    const a = new controler(sender)
    const [patientInfo, setpatientInfo] = useState({});    // MyInformation
    const [docCardInfo, setDocCardInfo] = useState([]);    // MyDoctors



    useEffect(()=>{
        const init = async ()=> {
            setSender(window.ethereum.selectedAddress)
            setpatientInfo( await a.getPatieninfo(window.ethereum.selectedAddress) )
            //console.log(patientInfo)

        }
        init()
    },[changed])





    /////////////////////////////////////////////////// change Profile


    const changeProfile = async () =>{
        const user_type =  await a.getUserType(window.ethereum.selectedAddress)
        chaHandler(!changed)
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
                    <Loading/>
                    {selected==="pation_nav_item1" && <MyInformation obj={patientInfo} isDoctor={false} />}
                    {selected==="pation_nav_item2" && <MyHealthRecord obj2={medical_records}/> }
                    {selected==="pation_nav_item3" && <MyDoctors changed={changed} /> }
                </ContentContainer>

            </Body>
    )
}
export default Patient