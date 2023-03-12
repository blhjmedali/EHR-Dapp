import React, {useState} from "react";
import img from '../../images/img_1.png'
import DisplayPationsRow from "../../Components/DisplayPationsRow";
import PatiensListComponent from "./PatiensListComponent";

const MyPatients = ()=>{
    const [state,stateHandler]= useState('view')
    const patients_array= [
        {numb :'1' ,patient_name:'BELHADJ Mohamed Ali' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
        {numb :'2' ,patient_name:'Bouras Taha Yacine' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
        {numb :'3' ,patient_name:'Aibout Sidahmed' ,wallet:'0x2918aB4589a60fAE57161132d6951F832287e9a2'   },
    ]
    const [wallet_address , walAdrHandler]=useState()
    function submitHandler(e){
        e.preventDefault()
        alert(wallet_address)
    }
    return(
        <div className=' bg-light p-4  rounded shadow  w-75'>
            <h4 className='text-primary '>My Patiens : </h4>
            <button onClick={()=>{stateHandler('add')}} className='btn btn-secondary m-4'>Add Pations</button>
            <button onClick={()=>{stateHandler('view')}} className='btn btn-secondary m-4'>Display Pations</button>
            <hr className="hr shadow"/>

            {state==='view' && <PatiensListComponent patients_array={patients_array}/>}
            {state==='add' && <div className=' p-2 '>
                <h4>Add patient :</h4>
                <form  className='d-flex m-4' onSubmit={submitHandler}>
                    <input required={true} onChange={(e)=>{walAdrHandler(e.target.value)}}  placeholder='Wallet Adress' pattern="^(0x)?[0-9a-fA-F]{40}$" className='form-control' />
                    <button className='btn btn-primary ' >Submit</button>
                </form><br/>
                <p>* To add the patient you have to add his wallet address</p>


            </div>}


        </div>
    )
}

export default MyPatients