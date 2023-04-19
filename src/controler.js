import Web3 from "web3";
import myContract from "./Contract.json";
import admin from "./Pages/Admin/Admin";


class contoler {
     constructor (sender) {
        this.contractAddress = "0x6A26aBE8eB87658fc099e331F3B167FF9CEA1511"
        this.web3 = new Web3(window.ethereum)
        this.contract = new this.web3.eth.Contract(myContract.abi,this.contractAddress,{from :sender ,  gas: 1000000})
     }

    async admin(){
        return await this.contract.methods.admin().call()
    }
    // *****************  FREE  *****************
    async whoIam(){
        return await this.contract.methods.whoIam().call()
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


    async getUserType(address){
        if (await this.isAdmin(address) ) return "Admin"
        if (await this.isDoctor(address) ) return "Doctor"
        if (await this.isPatient(address) ) return "Patient"
    }
    async isDoctor(address){
        return await this.contract.methods.isDoctor(address).call()
    }
    async isPatient(address){
        return await this.contract.methods.isPatient(address).call()
    }
    async isAdmin(address){
        return await this.contract.methods.isAdmin(address).call()
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
                obj.gender
            ).send({from:sender})
            .then ( recipt =>console.log(recipt) )
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
                obj.gender
            ).send({from:sender})
            .then ( recipt =>console.log(recipt) )
            .catch( error => {
                console.log("Only Admin Can add Patient")
            })
    }
}
export default contoler