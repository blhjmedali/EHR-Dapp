import {useState} from "react";
import FormInputRow from "../Pages/Admin/FormInputRow";
import contoler from "../controler";


// this component is a form that used by <Admin/> to create new (Doctor / Patient )

function Form (prop){
    const wilayat = ['Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar','Blida','Bouïra','Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Algiers','Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem','M\'Sila,Mascara','Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arréridj','Boumerdes','El Taref','Tindouf','Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Ain Defla','Naâma','Ain Timouchent','Ghardaia','Relizane',"El M\'Ghair","El Menia","Ouled Djellal","Bordj Baji Mokhtar","Béni Abbès","Timimoun","Touggourt","Djanet","In Salah",'In Guezzam']

    const [info , setInfo]=useState({
        doctor_address :"",patient_address:'' ,

        first_name:""  , last_name :"" ,  email:"",    birth_date:"",  phone:"",  gender:"",

        join_date :""  , specialite:"" ,  hospital_name:"" , wilaya:"",
    })


    async function submitHandler(e){
        e.preventDefault()
        info.join_date = getDate()

        // create instance of controller
        let sender = window.ethereum.selectedAddress
        const a = new contoler(sender)

        // create patient or doctor depending on form type ( New doctor form / New patient form )
        isDoctor()? await a.createDoctor(sender,info)  : await a.createPatient(sender,info)
        prop.on(e=>!e)  // reset
    }

    // check type of form ( doctor form / patient form )
    function isDoctor() { return prop.userType!='patient'}



    return(
        <div  className='rounded p-3 '>
            <h2>Form {isDoctor() ? "doctor": "patient" }</h2>

            <form onSubmit={submitHandler}>
                {/*     Wallet Address     */}
                <FormInputRow pattern={"^(0x)?[0-9a-fA-F]{40}$"}  lbl='Wallet Id'  inpt_type='text' class='row '
                              onChange={e=>{ isDoctor() ?
                                  info.doctor_address = e.target.value :
                                  info.patient_address = e.target.value}}/>

                {/*     First name   &   Last name     */}
                <div className='d-flex justify-content-between'>
                    <FormInputRow pattern={"^[a-zA-Z'-]+$"}  onChange={e=>info.first_name = e.target.value}     lbl='First Name' inpt_type='text' class='row w-50' />
                    <FormInputRow pattern={"^[a-zA-Z'-]+$"}  onChange={e=>info.last_name  = e.target.value}     lbl='Last Name'  inpt_type='text' class='row w-50'/>
                </div>

                {/*     Email     */}
                <FormInputRow pattern={"[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"} onChange={e=>info.email = e.target.value}  lbl='Email' inpt_type='email' class='row '/>

                {!isDoctor()?<></>:
                    // if doctor form add specialite & hospital
                    <div className='d-flex justify-content-between'>
                        <FormInputRow pattern={"^[a-zA-Z'-]+$"} onChange={e=>info.specialite = e.target.value} lbl='Speciality' inpt_type='text' class='row w-50' />
                        <FormInputRow pattern={"^[a-zA-Z'-]+$"} onChange={e=>info.hospital_name = e.target.value} lbl='Hospital / Clinic'  inpt_type='text' class='row w-50'/>
                    </div>
                }
                {/*   Wilaya   */}
                <div className='row p-1'>
                    <label className='col-auto align-self-center text-secondary'><b>Location</b></label>
                    <select required={true}   onChange={(e)=>{info.wilaya=e.target.value}} className='form-select'>
                        <option  value=''>Select wilaya</option>
                        {wilayat.map((item,idx)=>{return <option key={idx} value={item}>{item}</option>})}
                    </select>
                </div>

                <FormInputRow  lbl='Birth Date'  onChange={e=>info.birth_date = e.target.value} inpt_type='date' class='row '/>
                <FormInputRow  lbl='Phone number' onChange={e=>info.phone = e.target.value} inpt_type='tel'  class='row ' pattern={"^(\\+213|0)(5|6|7)[0-9]{8}$"}/>

                {/*   Gender   */}
                <fieldset className='row border-bottom p-2 '>
                    <label className='col-auto align-self-center text-secondary'><b>Gender</b></label>
                    <div className='d-flex justify-content-around'>
                        <label> Male  <input required={true} name='gender'  value='male'   onChange={e => info.gender=e.target.value} className='col form-check-input' type='radio' /></label>
                        <label> Female<input  name='gender'  value='female' onChange={e => info.gender=e.target.value} className='col form-check-input' type='radio' /></label>
                    </div>
                </fieldset>

                {/*     Submit button     */}
                <div className='d-flex justify-content-center mt-4'>
                    <button className={' btn  w-25 shadow '.concat(isDoctor()?'btn-success':'btn-primary')} >Submit</button>
                </div>

            </form>

        </div>
    )
}
function getDate() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    return month + '/' + day + '/' + year;
}

export default Form