import React, {useState} from "react";

function MyDoctors (){

    const [wallet_address , walAdrHandler]=useState()

    function submitHandler(e){
        e.preventDefault()
        alert(wallet_address)
    }


    return(
        <div className=' p-2 '>
            <h4>Add Doctor :</h4>
            <form  className='d-flex m-4' onSubmit={submitHandler}>
                <input required={true} onChange={(e)=>{walAdrHandler(e.target.value)}}  placeholder='Wallet Adress' pattern="^(0x)?[0-9a-fA-F]{40}$" className='form-control' />
                <button className='btn btn-primary ' >Submit</button>
            </form>
            <p>* To add the patient you have to add his wallet address</p>
        </div>
    )
}
export default MyDoctors