import React from "react";
import DisplayPationsRow from "../../Components/DisplayPationsRow";

const PatiensListComponent = (prop)=>{
    const line =prop.patients_array.map((item,ind)=>{
        return <DisplayPationsRow key={ind} patient_name={item.patient_name} numb={item.numb} wallet={item.wallet}/>
    })
    return(<div></div>)
}
export default PatiensListComponent