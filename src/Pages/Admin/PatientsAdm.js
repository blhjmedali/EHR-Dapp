import React, {useState} from "react";
import PatiensListComponent from "../Doctor/PatiensListComponent";
import Form from "../../Components/Form";

function PatientsAdm(){

    const patients_array= [
        {numb :'1' ,patient_name:'BELHADJ Mohamed Ali' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
        {numb :'2' ,patient_name:'Bouras Taha Yacine' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
        {numb :'3' ,patient_name:'Aibout Sidahmed' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
        {numb :'4' ,patient_name:'Kaid Sliman' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
    ]
    const[state , stateHandler]=useState('view')


    return(
        <>
            <h4 className='text-dark '><b>Patient : </b></h4><br/>
            <div className='d-flex justify-content-around '>
                <button onClick={()=>{stateHandler('view')}} className='btn btn-primary col-3 shadow-sm'>View Patient</button>
                <button onClick={()=>{stateHandler('add')}} className='btn btn-secondary col-3 shadow-sm' >Add new Patient</button>
            </div>
            <hr className="hr  "/>

            {state==='view'?<PatiensListComponent patients_array={patients_array}/>:<Form userType='patient'/> }

        </>
    )
}

export default PatientsAdm