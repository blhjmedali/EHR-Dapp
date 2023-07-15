import React from "react";
import bg1 from '../images/background/5.jpg'
import bg2 from '../images/background/img_1.png'
import bg3 from '../images/background/img.png'


const ContentContainer = (prop)=>{

    const containter = {backgroundColor : "rgba(255, 255, 255, 0.7)",
                        backdropFilter  : `blur(50px)${prop.type==='patient'?'brightness(100%)':'brightness(200%)'}  saturate(150%)`}


    // all styles
    const style_admin   ={ backgroundImage:`url(${bg1})` , backgroundSize:'cover'}
    const style_doctor  ={ backgroundImage:`url(${bg2})` , backgroundSize:'cover'}
    const style_patient ={ backgroundImage:`url(${bg1})` , backgroundSize:'cover'}
    const style_cnas    ={ backgroundImage:`url(${bg3})` , backgroundSize:'cover'}


    let style
    // custom style for each user type ( Admin / Doctor / Patient / Company )
    if(prop.type === 'admin')   {style =style_admin}
    if(prop.type === 'doctor')  {style =style_doctor}
    if(prop.type === 'patient') {style =style_patient}
    if(prop.type === 'company') {style =style_cnas}

    return(
        <div style={style} className='bg-light w-100 overflow-auto p-5'>
            <div style={containter} className=' p-4  rounded shadow-lg col-auto  col-xl-9 px-sm-12'>
                {prop.children}
            </div>
        </div>
    )
}

export default ContentContainer