import Web3 from "web3";
import myContract from "./Contract.json";
import {toast} from "react-toastify";


class contoler {
     constructor (sender) {
         this.contractAddress = "0xec6824C981A154e592F35f233B626E05651B1c7b"
         this.sender = sender
         this.web3 = new Web3(window.ethereum)
         this.contract = new this.web3.eth.Contract(myContract.abi,this.contractAddress,{from :sender ,  gas: 1000000})
     }

    // *****************  FREE  *****************
    async admin(){
        return await this.contract.methods.admin().call()
    }

    async whoIam(){
        return await this.contract.methods.whoIam().call()
    }

    async isAdmin(address){
        return await this.contract.methods.isAdmin(address).call()
    }
    async isDoctor(address){
        return await this.contract.methods.isDoctor(address).call()
    }
    async isPatient(address){
        return await this.contract.methods.isPatient(address).call()
    }

    async getAllDoctorAddresses(){
        return await this.contract.methods.getAllDoctorAddresses().call()
    }
    async getAllPatientAddresses(){
        return await this.contract.methods.getAllPatientAddresses().call()
    }

    async getDoctorinfo(doctor_address){
        return await this.contract.methods.getDoctorinfo(doctor_address).call()
    }
    async getPatieninfo(doctor_address){
        return await this.contract.methods.getPatieninfo(doctor_address).call()
    }
    async getMedicalRecordinfo(address){
        return await this.contract.methods.getMedicalRecordinfo(address).call()
    }

    async getAddressesOfMyPatiens(){
        return await this.contract.methods.getAddressesOfMyPatiens().call()
    }
    async getUserType(address){
        if (await this.isAdmin(address) ) return "Admin"
        if (await this.isDoctor(address) ) return "Doctor"
        if (await this.isPatient(address) ) return "Patient"
    }


    async getMyDoctors(){
        return await this.contract.methods.getMyDoctors().call()
    }


    // ***************** COST GAS *****************
    async createDoctor(sender , obj ){
        await this.contract.methods
            .createDoctor(
                obj.doctor_address ,
                obj.first_name,
                obj.last_name,
                obj.email,
                obj.specialite,
                obj.hospital_name,
                obj.wilaya,
                obj.birth_date,
                obj.phone,
                obj.gender,
                obj.join_date
            ).send({from:sender})
            .then(recipt => {
                console.log("doctor creation \n")
                console.log(recipt)
            })
            .catch( error => {
                console.log("Only Admin Can add Patient")
            })
    }
    async createPatient(sender , obj ){
        await this.contract.methods
            .createPatient(
                obj.patient_address ,
                obj.first_name,
                obj.last_name,
                obj.email,
                obj.wilaya,
                obj.birth_date,
                obj.phone,
                obj.gender,
                obj.join_date
            ).send({from:sender})
            .then(recipt => {
                console.log("Patient creation \n")
                console.log(recipt)
            })
            .catch( error => {
                console.log("Only Admin Can add Patient")
            })
    }
    async createMedicalRecord(sender , obj ){
        await this.contract.methods
            .createMedicalRecord(
                obj.patient_address ,
                obj.blood_type ,
                obj.height,
                obj.weight,
                obj.vision_test,
                obj.medical_history,
                obj.diagnostic_tests,
                obj.treatments
            ).send({from:sender})
            .then(recipt => {
                console.log(recipt)
            })
            .catch( error => {
                console.log("Only Doctor Can add Patient")
            })
    }
    async approveDoctor(address , sender){
         try {
             await this.contract.methods.approveDoctor(address)
                 .send({from : sender})
                 .then(recipt => {
                     console.log("Approve doctor successfully \n")
                     console.log(recipt)
                     //window.location.reload()
                 })
                 .then(toast.success("Successfully add a Doctoor "))
         }catch (e) {
             const error_message = e.message

             if(error_message.includes("You already approve this doc")){
                 console.log("You already approve this doc")
                 toast("You already approve this doc",{position: "top-left"})
             }
             if(error_message.includes("This address doesn't belong to a Doctor")){
                 console.log("This address doesn't belong to a Doctor")
                 toast("This address doesn't belong to a Doctor",{position: "top-left"})
             }
         }
    }
    async disapproveDoctor(address , sender){
         try {
             await this.contract.methods.disapproveDoctor(address)
                 .send({from : sender})
                 .then(recipt => {
                     console.log("delete doctor successfully \n")
                     console.log(recipt)
                 })
                 .then(toast("Successfully delete Doctoor "))
         }catch (e) {
             console.log(e.message)
         }
    }

}
export default contoler