import React from "react";

const DisplayRowKV =(props)=>{
    return(
        <div className='  d-flex p-2 w-75   '>
            <label className='w-50 d-flex '><b> {props.lbl} </b></label>
            <div className="vr d-flex justify-content-center "></div>
            <label className='w-50 d-flex offset-1'>{props.valeur}</label>
        </div>
    )
}
export default DisplayRowKV