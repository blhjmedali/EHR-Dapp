import React, {useState} from "react";
import {Link ,useNavigate } from "react-router-dom";
import Web3 from "web3";
import Controler from "../controler";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () =>{



    const getAdress = async ()=>{
        const provider = window.ethereum;
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts()
        walletHandler(accounts[0])
    }
    const navigate = useNavigate()
    const [wallet_address , walletHandler]= useState()
    window.ethereum.on('accountsChanged',getAdress)
    window.ethereum.on('connect',getAdress)

    const a = new Controler(window.ethereum.selectedAddress)

    async function adminHandler() {
        if(await a.isAdmin(window.ethereum.selectedAddress)) {
            navigate("/Admin")
            toast.success("Successfully logged in Admin ")
        }
        else{
            toast.warning("You are not an admin ")
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.info("log in using Metamask")
        }

    }

    async function doctorHandler() {
        if(await a.isDoctor(window.ethereum.selectedAddress)) {
            navigate("/Doctor")
            toast.success("Successfully logged in doctor ")
        }
        else{
            toast.warning("You are not an doctor ")
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast.info("log in using Metamask")

        }

    }

    async function patientHandler() {
        if(await a.isPatient(window.ethereum.selectedAddress)) {
            navigate("/Patient")
            toast.success("Successfully logged in Patient ")
        }
        else{
            toast.warning("You are not an patient ")
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast.info("log in using Metamask")

        }

    }

    return(
        <nav className='navbar navbar-expand-md sticky-top  navbar-dark bg-dark navbar-fixed'>
            <div className="m-2">
                <Link to='/' className="navbar-brand p-3" >DossierMedical</Link>
            </div>
            <div className="collapse navbar-collapse ">
                <ul className='navbar-nav  '>
                    <li className='nav-item'> <Link onClick= {adminHandler}   to='#'className='nav-link' > Admin</Link></li>
                    <li className='nav-item'> <Link onClick= {doctorHandler}  to='#'className='nav-link' > Doctor</Link></li>
                    <li className='nav-item'> <Link onClick= {patientHandler} to='#'className='nav-link' > Patient</Link></li>
                    <li className='nav-item'> <Link to='#'className='nav-link'> About</Link></li>
                </ul>
            </div>
            <span className='navbar-text col-4'>{wallet_address}</span>

            <ToastContainer theme="dark" position="top-right" />
        </nav>
    )
}



export default Header
