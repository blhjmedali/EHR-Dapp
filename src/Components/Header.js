import React, {useEffect, useState} from "react";
import {Link ,useNavigate } from "react-router-dom";
import Web3 from "web3";
import Controler from "../controler";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaUserMd } from "react-icons/fa";
import { FaUserInjured ,FaUser} from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";



const Header = () =>{



    useEffect(()=>{

    })

    const onChange = async ()=>{
        walletHandler(window.ethereum.selectedAddress)
    }

    const navigate = useNavigate()
    const [wallet_address , walletHandler]= useState()
    window.ethereum.on('accountsChanged',onChange)
    window.ethereum.on('connect',onChange)

    const a = new Controler(window.ethereum.selectedAddress)

    async function adminHandler() {
        if(await a.isAdmin(window.ethereum.selectedAddress)) {
            navigate("/Admin")
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
        }
        else{
            toast.warning("You are not a doctor ")
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast.info("log in using Metamask")

        }

    }

    async function patientHandler() {
        if(await a.isPatient(window.ethereum.selectedAddress)) {
            navigate("/Patient")
        }
        else{
            toast.warning("You are not a patient ")
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast.info("log in using Metamask")

        }

    }

    async function CompanyHandler() {
        if(await a.isCompanyAs(window.ethereum.selectedAddress)) {
        navigate("/Company")
        }
        else{
            toast.warning("You are not Company ")
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast.info("log in using Metamask")

        }

    }

    return(
        <nav className='navbar navbar-expand-md sticky-top  navbar-dark bg-dark navbar-fixed'>
            <div className="m-2">
                <Link to='/' className="navbar-brand p-3" >DossierMedical</Link>
            </div>

            <div className=" navbar-collapse justify-content-between ">
                <div className='navbar-nav  '>
                    <a onClick= {CompanyHandler} href='#' className='nav-link '>Company  </a>
                    <a onClick= {doctorHandler}  href='#' className='nav-link '>Doctor</a>
                    <a onClick= {patientHandler} href='#' className='nav-link' >Patient</a>
                </div>
                <span className='navbar-text text-muted '><small>{wallet_address}</small></span>
                <div className='navbar-nav  me-4'>
                    <Link onClick= {adminHandler}   to='#' className='nav-link ' > <FaUser/> Admin</Link>
                </div>
            </div>





            <ToastContainer theme="dark" position="top-right" />
        </nav>
    )
}



export default Header
