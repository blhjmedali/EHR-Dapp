import Web3 from "web3";
import myContract from "./Contract.json";
import {toast} from "react-toastify";


class contoler {
     constructor (sender) {
         //"0xDd934c307677ee1B04DaD2477d0Ed187780033E8"
         //this.contractAddress = localStorage.getItem('smartContract')
         this.contractAddress = '0xa47C4eC02729e6495DA04F4FeAB6d1e7D2CaBd05'
         this.sender = sender
         this.web3 = new Web3(window.ethereum)
         this.contract = new this.web3.eth.Contract(myContract.abi,this.contractAddress,{from :sender})
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
    async isCompanyAs(address){
        return await this.contract.methods.isCompanyAs(address).call()
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
    async getCompanyinfo(company_address){
        return await this.contract.methods.getCompanyinfo(company_address).call()
    }

    async getPatiensCount(){
        return await this.contract.methods.getPatiensCount().call()
    }
    async getDoctorsCount(){
        return await this.contract.methods.getDoctorsCount().call()
    }

    async getMedicalRecordinfo(address){
        return await this.contract.methods.getMedicalRecordinfo(address).call()
    }

    async getAddressesOfMyPatiens(){
        return await this.contract.methods.getAddressesOfMyPatiens().call()
    }
    async getAddressesOfMyCustomers(){
        return await this.contract.methods.getAddressesOfMyCustomers().call()
    }
    async getUserType(address){
        if (await this.isAdmin(address) ) return "Admin"
        if (await this.isDoctor(address) ) return "Doctor"
        if (await this.isPatient(address) ) return "Patient"
        if (await this.isCompanyAs(address) ) return "Company"

    }


    async getMyDoctors(){
        return await this.contract.methods.getMyDoctors().call()
    }


    // ***************** COST GAS *****************
    async createDoctor (sender , obj ){
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
                console.log("Only Admin Can add Patient controler")
                console.log(error)
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
                console.log("Only Admin Can add Patient controler")
                console.log(error)
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
            ).send({from:sender })
            .then(recipt => {
                console.log(recipt)
            })
            .catch( error => {
                console.log("Only Doctor Can add Patient Medical Record")
                console.log(error)
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

    async allow(address , sender){
        try {
            await this.contract.methods.allow(address)
                .send({from : sender})
                .then(recipt => {
                    console.log("Allow this company \n")
                    console.log(recipt)
                    //window.location.reload()
                })
        }catch (e) {
            const error_message = e.message
            console.log(error_message)
        }
    }
    async disAllow(address , sender){
        try {
            await this.contract.methods.disAllow(address)
                .send({from : sender})
                .then(recipt => {
                    console.log("delete company successfully \n")
                    console.log(recipt)
                })
                .then(toast("Successfully delete company "))
        }catch (e) {
            console.log(e.message)
        }
    }




    /// Metamask
    async connectToMetaMask() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = window.ethereum;
            try {
                await provider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(provider);

                const accounts = await web3.eth.getAccounts();
                const address = accounts[0];
                console.log(`Connected to MetaMask with address: ${address}`);
                return web3;
            } catch (error) {
                console.error('Failed to connect to MetaMask', error);
            }
        } else {
            console.error('MetaMask is not installed');
        }
    }
    async getContractMethodes(){
        const methodes =[]
        for (const methode in this.contract.methods){
            methodes.push(methode)
        }
        return methodes
    }
    async getBalance (address){
        const balance = await this.web3.eth.getBalance(address)
        const ether = this.web3.utils.fromWei(balance,"ether")
        return ether

    }




}
export default contoler