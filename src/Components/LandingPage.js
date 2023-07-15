import React, {useEffect, useState} from "react"
import controler from "../controler"
import Button from "react-bootstrap/Button"
import img from "../images/Icon/metamask.png"
import bg2 from "../images/svg/vecteezy_close-up-of-a-stethoscope-and-digital-tablet-with-virtual_22874499_3.jpg"
import {useNavigate} from "react-router-dom"
import {Form} from "react-bootstrap";
import DisplayRowKV from "./DisplayRowKV";





function LandingPage(){

    const [wallet_address , walletHandler]= useState()
    const [sc_address , scHandler]= useState()
    const [balance , balanceHandler]= useState(null)


    useEffect(()=>{

    })

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

    //async function whoiam() {await a.getAddressesOfMyCustomers()}

    function addSmartContractAddress(e) {
        localStorage.setItem('smartContract',sc_address)
    }

    return(
        <div className='vh-100  text-white' style={{backgroundImage:`url(${bg2})`,backgroundSize:'cover'}}>
            <div className=' d-flex vh-100  justify-content-center  ' >

                <div className=' w-50 align-self-center p-4  rounded shadow' style={{backgroundColor : "rgba(0, 0, 0, 0.9)"}}>

                    <small className='text-muted mt-2'><i>This DAPP is a graduation project for M2 SIC</i></small>
                    <h1 className='rounded p-3 bg'>EHR-DAPP  </h1>


                    {/*                   1                       */}
                    <label className='text-light'>1 / Enter the address of smart contract</label>

                    <Form onSubmit={addSmartContractAddress} className=' p-3 rounded border border-dark  bg-gradient'>

                        <div className='d-flex'>
                            <small>Smart contract Address</small>
                            <Form.Control size='sm' pattern='^(0x)?[0-9a-fA-F]{40}$' onChange={(event)=>{scHandler(event.target.value)}}/>
                            <button className='btn btn-outline-warning ' > Add </button>
                        </div>

                        <div className=' container'>
                            <small className='text-muted' >{localStorage.getItem('smartContract')}</small>
                        </div>
                    </Form>


                    {/*                   2                       */}

                    <br/>
                    <label className='text-light'>2 / Connect the wallet</label>
                    <div className='d-flex p-3 rounded border border-dark  bg-gradient justify-content-center'>
                        <Button  className='btn-dark btn-outline-warning m-2' onClick={connectMetamask}>
                            <img className='navbar-toggler-icon' src={img}/>
                            Connect Metamask
                        </Button>
                    </div>

                    {/*                   3                       */}


                    <br/>
                    <label className='text-light'>3 / Add those accounts to metamask ( CNAS / CASNOS ) </label>
                    <div className=' p-3 rounded border border-dark  bg-gradient justify-content-center '>

                        <span className='badge border border-warning col-2'>CNAS </span>
                        <label className='badge  bg-warning bg-opacity-25 m-2'>0x71ecc1cc9bdb708f181fec9cc123da8566cc8796786b27abca3f73931f84426a</label> <br/>

                        <span className='badge  border border-warning col-2'>CASNOS</span>
                        <label className='badge bg-warning bg-opacity-25  m-2 '>0x779ba6ed143ebcbc55ac192ab42f78ea5fb598b9a2690871718946de24558526</label>

                    </div>
                    {/*                   4                       */}

                    <Button onClick={test} className='btn-primary'> Test </Button>

                    
                </div>

            </div>
        </div>
    )
    function test() {
        const a = localStorage.getItem('smartContract')
        alert(a)
    }

}

export default LandingPage