import React, {useEffect, useState} from "react";
import {Link ,useNavigate } from "react-router-dom";
import Web3 from "web3";
import Controler from "../controler";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaUserMd } from "react-icons/fa";
import { FaUserInjured ,FaUser} from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";
import {Nav, Navbar} from "react-bootstrap";



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
        <>
            <Navbar  expand="lg" bg="dark" data-bs-theme="dark" >
                <Navbar.Brand >
                    <Link to='/' className="navbar-brand p-3 text-muted" >DossierMedical</Link>
                </Navbar.Brand>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto " >
                        <Link onClick= {CompanyHandler} to='#' className='nav-link nav-item px-2 text-muted '>Company  </Link>
                        <Link onClick= {doctorHandler}  to='#' className='nav-link nav-item px-2 text-muted'>Doctor</Link>
                        <Link onClick= {patientHandler} to='#' className='nav-link nav-item px-2 text-muted' >Patient</Link>
                        <Link onClick= {adminHandler}   to='#' className='nav-link nav-item px-2 text-muted' > {/*<FaUser/>*/} Admin</Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

            </Navbar>
            <ToastContainer theme="dark" position="top-right" />

        </>
    )
}



export default Header
