import React from "react";
import img from "../images/img_1.png";

const DisplayPationsRow =(props)=>{
    return(
        <div  style={{backgroundColor:"#26a5fd", backgroundImage: "linear-gradient(135deg, #26a5fd 6%, #80D0C7 90%)"}}
             className=' d-flex border shadow border-bottom rounded w-auto  m-3'>
            <img style={{width:80 , height:80}}className='  d-flex align-self-center' src={img}/>
            <div className=' row m-2'>
                <p className=' d-flex justify-content-center  text-muted'><i>{props.wallet}</i></p>
                <h6 className='col-3  text-muted'><b>Patient {props.numb} : </b></h6>
                <h6 className='col-8 text-muted '>{props.patient_name}</h6>
            </div>
        </div>
    )
}

export default DisplayPationsRow