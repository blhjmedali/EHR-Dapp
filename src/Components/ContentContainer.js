import React, {useState} from "react";
import bg1 from '../images/background/5.jpg'
import bg2 from '../images/background/img_1.png'
import bg3 from '../images/background/img.png'
import bg4 from '../images/background/img_2.png'
import img from '../images/svg/medical-5459631.svg'

const ContentContainer = (prop)=>{

    const containter = {backgroundColor : "rgba(255, 255, 255, 0.7)",
                        backdropFilter  : `blur(50px) ${prop.type==='patient'?'brightness(100%)':'brightness(200%)'}  saturate(150%)`}

    const style_admin={backgroundImage:`url(${bg1})` , backgroundSize:'cover'}
    const style_doctor={backgroundImage:`url(${bg2})` , backgroundSize:'cover'}
    const style_patient={backgroundImage:`url(${bg1})`, backgroundSize:'cover'}
    const style_cnas={backgroundImage:`url(${bg3})`, backgroundSize:'cover'}


    let style

    if(prop.type === 'admin')   {style =style_admin} //styleHandler(style_admin)}
    if(prop.type === 'doctor')  {style =style_doctor} //styleHandler(style_doctor)}
    if(prop.type === 'patient') {style =style_patient} //styleHandler(style_patient)}
    if(prop.type === 'company') {style =style_cnas} //styleHandler(style_patient)}

    return(
        <div style={style} className='bg-light w-100 overflow-auto p-5'>
            <div style={containter} className=' p-4  rounded shadow-lg w-75'>
                {prop.children}
            </div>
        </div>
    )
}

export default ContentContainer