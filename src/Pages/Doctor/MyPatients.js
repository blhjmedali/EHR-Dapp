import React, {useState} from "react";
import img from '../../images/img_1.png'
import DisplayPationsRow from "../../Components/DisplayPationsRow";
import PatiensListComponent from "./PatiensListComponent";

const MyPatients = ()=>{
    const patients_array= [
        {numb :'1' ,patient_name:'BELHADJ Mohamed Ali' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
        {numb :'2' ,patient_name:'Bouras Taha Yacine' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
        {numb :'3' ,patient_name:'Aibout Sidahmed' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
    ]

    return(
        <>
            <h4 className='text-dark '><b>My Patiens : </b></h4>

            <hr className="hr shadow"/>

            <PatiensListComponent patients_array={patients_array}/>



        </>
    )
}

export default MyPatients