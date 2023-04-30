import React, {useState} from "react";
import Web3 from "web3";
import myContract from '../Contract.json'
import controler from "../controler"
async function connectToMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        // Use MetaMask provider
        const provider = window.ethereum;
        try {
            // Request account access
            await provider.request({ method: 'eth_requestAccounts' });
            // Create a new Web3 instance
            const web3 = new Web3(provider);
            // Get the user's Ethereum address
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
function getContractMethodes(contract){
    const methodes =[]
    for (const methode in contract.methods){
        methodes.push(methode)
    }
    return methodes
}
function getSelectedAddress(){
    return window.ethereum.selectedAddress
}

function LandingPage(){

    const [wallet_address , walletHandler]= useState(null)
    const [balance , balanceHandler]= useState(null)

//   ********    Inisialisation    ********

    const getAdress = async ()=>{
        walletHandler(getSelectedAddress)
    }
    const getbalance = async ()=>{
        //const balance = await web3.eth.getBalance(wallet_address)
        //const ether = web3.utils.fromWei(balance,"ether")
        //balanceHandler(ether)
        // console.log("Medical Record",
        //     await a.getMedicalRecordinfo("0x695553ff7eAAdb81BCeb8DEEE24118dC36c486AF")
        // )

        const obj = {
            patient_address:'0x695553ff7eAAdb81BCeb8DEEE24118dC36c486AF',
            blood_type:'o+',
            height:'172',
            weight:'54',
            vision_test:'7  ',
            medical_history:['mh1','mh2','mh3'],
            diagnostic_tests:['dt'],
            treatments:['History of smoking, quit 2 years ago','Hypertension, well controlled on lisinopril 20mg daily'],

        }
        await a.createMedicalRecord(window.ethereum.selectedAddress,obj)

    }







    const sender = window.ethereum.selectedAddress
    const a = new controler(sender)

    const gsa = async ()=>{
        let doctor_obj ={
            doctor_address : "0xff640B68F773729E8A352cCa92888dc3535dB90d",
            first_name: "Doctor 5 ",    last_name    : "Doctor 5 "    ,  email : "Doctor 5 ",
            specialite: "Doctor 5 ",    hospital_name: "Doctor 5 ",  wilaya: "Doctor 5 ",
            birth_date: "Doctor 5 ",    phone        : "Doctor 5 "        ,  gender: "Doctor 5 ",
            join_date :"12/12/2012"
        }
        let patient_obj={
            patient_address:"0x9fE7AF5782D9bf27ECC304EE6ED34c0FF97b9eE0",
            first_name: "Bouras"  , last_name : "taha"    ,    email : "yacine.ofdm@gmail.com"  ,
            wilaya    : "El Bayadh"      , birth_date: "01/06/1989"   ,    phone : "0755889977"  ,
            gender    : "male"        , join_date :"12/12/2012"
        }

        //await a.createDoctor(sender,doctor_obj)
        //await a.createPatient(sender,patient_obj)


    }


    const logout = async ()=>{
        console.log(await a.getPatieninfo(sender))
        console.group(sender)
    }

    window.ethereum.on('accountsChanged',getAdress)
    window.ethereum.on('connect',getAdress)

    return(
        <div className='bg-secondary vh-100' >
            <div className=' d-flex  justify-content-center ' >
                <div className=' w-50 bg-secondary border m-4 p-2  rounded shadow-sm'>
                    <button onClick={connectToMetaMask} className='btn btn-dark  shadow-sm m-2'>Connect Metamask</button>
                    <h6>Statue :</h6>
                    <button onClick={getAdress} className='btn btn-light shadow-sm m-2 '>Get Address </button>
                    <h6>Wallet address : {wallet_address}</h6>
                    <button onClick={getbalance} className='btn btn-light shadow-sm m-2 '>Get Balence </button>
                    <h6>balance : {balance}</h6>


                    <button onClick={gsa}>get selected address</button>
                    <button onClick={logout}>logout</button>



                </div>
            </div>
        </div>
    )
}

export default LandingPage