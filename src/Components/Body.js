import React from "react";

const Body =(props) =>{
    return(
        <div className='bg-primary container-100 vh-100  d-flex overflow-hidden'>
            {props.children}
        </div>
    )
}
export default Body