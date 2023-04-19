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
    }







    const sender = window.ethereum.selectedAddress
    const a = new controler(sender)

    const gsa = async ()=>{
        let doctor_obj ={
            doctor_address : "0xff640B68F773729E8A352cCa92888dc3535dB90d",
            first_name: "Doctor 5 ",    last_name    : "Doctor 5 "    ,  email : "Doctor 5 ",
            specialite: "Doctor 5 ",    hospital_name: "Doctor 5 ",  wilaya: "Doctor 5 ",
            birth_date: "Doctor 5 ",    phone        : "Doctor 5 "        ,  gender: "Doctor 5 "
        }
        let patient_obj={
            patient_address:"0x695553ff7eAAdb81BCeb8DEEE24118dC36c486AF",
            first_name: "patient 1"  , last_name : "patient 1"    ,    email : "patient 1"  ,
            wilaya    : "patient 1"      , birth_date: "patient 1"   ,    phone : "patient 1"  ,
            gender    : "patient 1"
        }

        await a.createDoctor(sender,doctor_obj)
        await a.createPatient(sender,patient_obj)


    }


    const logout = async ()=>{
        console.log(await a.getUserType(sender))
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