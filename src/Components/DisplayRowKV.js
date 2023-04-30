import React, {useEffect, useState} from "react";

const DisplayRowKV =(props)=>{

    const [newValue , setNewValue]=useState('')


    function onChange(e){
        //setNewValue()
        console.log(e.target.value)
        props.setValue(e.target.value)
        //props.setValue(e.target.value)

    }



    const type = ()=>{
        if(props.type==='h'){return " cm"}
        if(props.type==='w'){return " kg"}
        if(props.type==='v'){return " / 10"}
        else {return ""}
    }

    const isDoctor = props.isDoctor



    return(

        <div className='  d-flex p-2 w-75   '>
            <label className='w-50  d-flex '><b> {props.lbl } </b></label>
            <div className="vr d-flex justify-content-center "></div>
            {
                !isDoctor?
                    <label className='w-50 d-flex offset-1'>{props.valeur +type()}</label>:             // if Patient

                    (!props.editable ?                                                          // if Doctor
                                                                                                //      in view mode
                        <>
                            <label className='w-50 d-flex offset-1'>{props.valeur +type()}</label>
                        </>
                        //else                                                                  //      in Edit Mode
                        :<>
                                <input className='form-control form-control-sm offset-1 w-50  '
                                       placeholder={props.valeur}
                                       //type={(props.type==='h'|props.type==='w'|props.type==='w') ?'':''}
                                       onChange={onChange}
                            />
                        </>

                    )
            }
        </div>
    )
}
export default DisplayRowKV