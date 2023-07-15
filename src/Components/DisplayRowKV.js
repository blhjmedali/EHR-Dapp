import React from "react";

const DisplayRowKV =(props)=>{

    // check if parent component is doctor or patient
        const isDoctor = props.isDoctor

    // check if type of display value is height / weight / ...
        const type = ()=>{
            if(props.type==='h') return " cm"
            if(props.type==='w') return " kg"
            if(props.type==='v') return " / 10"
            else return ""
        }

    // get value of input in case of editable
    function onChange(e){ props.setValue(e.target.value) }

    return(
        <div className='  d-flex p-2 w-75   '>
            <label className='w-50  d-flex '><b> {props.lbl } </b></label>
            <div className="vr d-flex justify-content-center "></div>

            {
                !isDoctor?
                    // if Patient => only view mode
                    <label className='w-50 d-flex offset-1'>{props.valeur +type()}</label>:


                    // if Doctor  => have 2 possibilities ( view mode / edit mode )
                    (!props.editable ?
                            // view mode
                            <>
                                <label className='w-50 d-flex offset-1'>{props.valeur +type()}</label>
                            </> :

                            // edit mode
                            <>
                                <input className='form-control form-control-sm offset-1 w-50  '
                                       placeholder={props.valeur}
                                       onChange={onChange}
                                />
                            </>

                    )
            }
        </div>
    )
}
export default DisplayRowKV