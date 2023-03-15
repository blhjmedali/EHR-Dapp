import {useState} from "react";
import FormInputRow from "../Pages/Admin/FormInputRow";

function Form (prop){
    const wilayat = ['Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar','Blida','Bouïra','Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Algiers','Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem','M\'Sila,Mascara','Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arréridj','Boumerdes','El Taref','Tindouf','Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Ain Defla','Naâma','Ain Timouchent','Ghardaia','Relizane',"El M\'Ghair","El Menia","Ouled Djellal","Bordj Baji Mokhtar","Béni Abbès","Timimoun","Touggourt","Djanet","In Salah",'In Guezzam']
    const[values, valuesHandler]=useState(
        {wallet_id : undefined, first_name :undefined  ,  last_name   :undefined  ,  email:undefined,
            wilaya    : undefined, birth_date:undefined  ,  phone_number:undefined  ,  gender:undefined , joining_date:undefined})
    const [docValues,docValuesHandler]=useState({Speciality:undefined,hospital_name:undefined})
    function submitHandler(e){
        e.preventDefault()
        values.joining_date=getDate()


        if(isDoctor()){
            const docObject = Object.assign({}, values, docValues);
            console.log(docObject)
        }
        else {console.log(values)}


    }
    function isDoctor(){
        return prop.userType!='patient'
    }
    const style = isDoctor()?{backgroundColor:' rgba(200, 255, 200, 0.1)'}:{backgroundColor:' rgba(0, 0, 255, 0.1   )'}
    return(
        <div  className='rounded p-3 '>
            <h2>Form {isDoctor() ? "doctor": "patient" }</h2>
            <form onSubmit={submitHandler}>

                <FormInputRow pattern={"^(0x)?[0-9a-fA-F]{40}$"} onChangeHandler={e=>{values.wallet_id=e.target.value }}  lbl='Wallet Id' inpt_type='text' class='row ' />
                <div className='d-flex justify-content-between'>
                    <FormInputRow pattern={"^[a-zA-Z'-]+$"} onChangeHandler={e=>{values.first_name=e.target.value}}  lbl='First Name' inpt_type='text' class='row w-50' />
                    <FormInputRow pattern={"^[a-zA-Z'-]+$"} onChangeHandler={e=>{values.last_name=e.target.value} } lbl='Last Name'  inpt_type='text' class='row w-50'/>
                </div>
                <FormInputRow pattern={"[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"} onChangeHandler={e=>{values.email=e.target.value}} lbl='Email' inpt_type='email' class='row '/>

                {!isDoctor()?<></>:
                    <div className='d-flex justify-content-between'>
                        <FormInputRow pattern={"^[a-zA-Z'-]+$"} onChangeHandler={e=>{docValues.Speciality=e.target.value}}  lbl='Speciality' inpt_type='text' class='row w-50' />
                        <FormInputRow pattern={"^[a-zA-Z'-]+$"} onChangeHandler={e=>{docValues.hospital_name=e.target.value} } lbl='Hospital / Clinic'  inpt_type='text' class='row w-50'/>
                    </div>
                }

                <div className='row p-1'> {/*   Wilaya   */}
                    <label className='col-auto align-self-center text-secondary'><b>Location</b></label>
                    <select required={true}  value={values.wilaya} onChange={(e)=>{values.wilaya=e.target.value}} className='form-select'>
                        <option  value=''>Select wilaya</option>
                        {wilayat.map((item,idx)=>{return <option key={idx} value={item}>{item}</option>})}
                    </select>
                </div>
                <FormInputRow onChangeHandler={e=>{values.birth_date=e.target.value}} lbl='Birth Date' inpt_type='date' class='row '/>
                <FormInputRow pattern={"^(\\+213|0)(5|6|7)[0-9]{8}$"} onChangeHandler={e=>{values.phone_number=e.target.value}}lbl='Phone number' inpt_type='tel' class='row '/>


                <fieldset className='row border-bottom p-2 '>
                    <label className='col-auto align-self-center text-secondary'><b>Gender</b></label>
                    <div className='d-flex justify-content-around'>
                        <label> Male  <input required={true} name='gender'  value='male'   onChange={event => values.gender=event.target.value} className='col form-check-input' type='radio' /></label>
                        <label> Female<input  name='gender'  value='female' onChange={event => values.gender=event.target.value} className='col form-check-input' type='radio' /></label>
                    </div>
                </fieldset>


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