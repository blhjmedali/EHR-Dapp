
const FormInputRow = (props)=>{


    const hint = "Example :  0xa8eF07C04CD6FF2d2A3e7d50D6501e9C537AD581"
    return(
        <div  className={props.class.concat(' p-1')}>
            <label className='col-auto align-self-center text-secondary'><b>{props.lbl}</b></label>
            <input  pattern={props.pattern} required={true} onChange={props.onChange}
                    className='shadow-sm  form-control'
                    placeholder={props.lbl=="Wallet Id"?hint:props.lbl}
                    type={props.inpt_type}
            />
        </div>
    )
}

FormInputRow.defaultProps={
    pattern:undefined
}
export default FormInputRow