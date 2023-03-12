import React from "react";

const DisplayList = (prop) =>{
    const list_item = prop.lst.map((item,index)=>{
        return <li key={index}>{item} </li>

    })
    return(
        <div>
            <h6  className='text-warning pt-5 '><b>{prop.titlee}</b> </h6>
            <ul>
                {list_item}
            </ul>
        </div>
    )
}
export default DisplayList