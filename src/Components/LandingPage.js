import React, {useState} from "react";
import Web3 from "web3";
import myContract from '../Contract.json'
import controler from "../controler"
import Button from "react-bootstrap/Button";
import img from "../images/Icon/metamask.png"
import bg from "../images/svg/bg.svg"
import bg2 from "../images/svg/vecteezy_close-up-of-a-stethoscope-and-digital-tablet-with-virtual_22874499_3.jpg"
import {useNavigate} from "react-router-dom";





function LandingPage(){

    const [wallet_address , walletHandler]= useState()
    const [balance , balanceHandler]= useState(null)

    const a = new controler(window.ethereum.selectedAddress)
//   ********    Inisialisation    ********


    function getSelectedAddress(){
        walletHandler(window.ethereum.selectedAddress )
    }
    async function connectMetamask(){  a.connectToMetaMask() }

    async function getBalance  (){
        balanceHandler(await a.getBalance(window.ethereum.selectedAddress))

    }



    /////////////////////////////////////////////////// change Profile
    const navigate = useNavigate()
    const getUserType = async () =>{
        const user_type =  await a.getUserType(window.ethereum.selectedAddress)
        if (user_type==="Admin"){
            navigate("/Admin")
        }
        if (user_type==="Doctor"){
            navigate("/Doctor")
        }
        if (user_type==="Patient"){
            navigate("/Patient")
        }
        if (user_type==="Company"){
            navigate("/Company")
        }
        if (user_type!="Admin"  && user_type!="Doctor"&& user_type!="Patient" && user_type!="Company"){
            navigate("/")
        }
    }
    window.ethereum.on('accountsChanged',getUserType)
    ///////////////////////////////////////////////////

    async function whoiam() {await a.getAddressesOfMyCustomers()}

    return(
        <div className='vh-100 text-white' style={{backgroundImage:`url(${bg2})`,backgroundSize:'cover'}}>
            <div className=' d-flex vh-100  justify-content-center  ' >

                <div className=' w-50 align-self-center p-4  rounded shadow' style={{backgroundColor : "rgba(0, 0, 0, 0.9)"}}>
                    <h1>EHR-DAPP  </h1>
                    <span>This DAPP is a graduation project for M2 SIC , Install Metamask and allow this website</span>

                    <Button  className='btn-light m-2' onClick={connectMetamask}>
                        <img className='navbar-toggler-icon' src={img}/>
                        Connect Metamask
                    </Button>
                    <br/>
                    <span>There is two different type of user ( Doctor and Patient  )</span><br/>


                    <Button onClick={getSelectedAddress} className=' btn-light shadow-sm m-2 '>Get Address </Button>
                    <h6>Adresse  : {wallet_address}</h6>

                    <Button onClick={getBalance} className=' btn-light shadow-sm m-2 '>Get Balence </Button>
                    <h6>Balance : {balance}</h6>

                    <Button onClick={whoiam}> address</Button>



                </div>

            </div>
        </div>
    )
}

export default LandingPage