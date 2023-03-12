import React from "react";

const ContentContainer = (prop)=>{
    const style1={
    backgroundImage:  'radial-gradient(#444cf7 1.75px, transparent 1.75px), radial-gradient(#444cf7 1.75px, #e5e5f7 1.75px)',
    backgroundSize: '70px 70px',
    backgroundPosition: '0 0,35px 35px',
    }


    return(
        <div style={style1} className='bg-light w-100 overflow-auto p-5'>
            {prop.children}
        </div>
    )
}

export default ContentContainer