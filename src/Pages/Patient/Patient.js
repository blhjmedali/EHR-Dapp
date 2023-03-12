import React, {useState} from "react";
import SideBar from "../../Components/SideBar";
import ContentContainer from "../../Components/ContentContainer";
import Body from "../../Components/Body";
import  img from '../../images/Pation.png'
import MyInformation from "./MyInformation";
import MyHealthRecord from "./MyHealthRecord";

const Patient=()=>{

    const [patient_nav_items]=useState([
        {id:'pation_nav_item1',navItemName:'My Information'},
        {id:'pation_nav_item2',navItemName:'My Health Records'},
        {id:'pation_nav_item3',navItemName:'My Doctors'},
        {id:'pation_nav_item4',navItemName:'Sign out'}
    ])          // items li fi SideBar ta3 patient (list of object )
    const patient_info= {
        fname:'BELHADJ',
        lname:'Mohamed Ali ',
        bdate:'25/10/2000',
        email:'blhj.medali@gmail.com ',
        num:'0655332288',
        wilaya:'El Bayadh',
        gen:true,
        join_date:'25/10/2053',
        isDoctor: false,
        wallet_key:"0x2918aB4589a60fAE57161132d6951F832287e9a2"
    }          // les information ta3 patient ( one object )
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

    // use state fiha var yedi string (selected item from sidebar)
    const[selected,selectedHandler]=useState('pation_nav_item1')
    function getSelectedItem(event){
        // get selected item and store it in var (selected)
        patient_nav_items.map((item)=> {
            if(event.target.id=== item.id){
                selectedHandler(item.id)
            }
        })
    }
    /* <MyHealthRecord obj2={medical_records} />      <MyInformation obj={pation_info}/> */
    return(

            <Body>
                <SideBar onClickInItem={getSelectedItem} title='Patient' aray={ patient_nav_items} pic={img}/>
                <ContentContainer>
                    {/*                  orientation based on selected item                   */}
                    {selected==="pation_nav_item1" && <MyInformation obj={patient_info}/>}
                    {selected==="pation_nav_item2" && <MyHealthRecord obj2={medical_records}/> }
                </ContentContainer>
            </Body>
    )
}
export default Patient