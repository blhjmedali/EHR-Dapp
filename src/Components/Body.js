import React from "react";

const Body =(props) =>{
    return(
        <div className='bg-primary vh-100  d-flex overflow-hidden'>
            {props.children}
        </div>
    )
}
export default Body