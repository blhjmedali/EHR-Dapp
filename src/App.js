import React, {useEffect, useState} from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {Spinner} from "react-bootstrap";


import {Admin,Doctor,Pation} from "./Pages/indexPages";
import {BrowserRouter, Routes, Route, useNavigate,Link} from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import controler from "./controler";





function App () {


    let sender = window.ethereum.selectedAddress
    const a = new controler(sender)
    //console.log(sender)

    //let navigate = useNavigate()
    const getUserType = async () =>{
        const user_type =  await a.getUserType(window.ethereum.selectedAddress)
        if (user_type==="Admin"){
            console.log("Admin")
            //window.location.reload();
        }
        if (user_type==="Doctor"){
            console.log("Doctor")
            //window.location.reload();

        }
        if (user_type==="Patient"){
            console.log("Patient")
            //window.location.reload();

        }

    }
    window.ethereum.on('accountsChanged',getUserType)

    const [path , pathHandler]=useState()
    useEffect(()=>{
        pathHandler(
            <Routes>
                <Route path='/Doctor'  element={<Doctor/>}/>
                <Route path='/Admin'   element={<Admin/>}/>
                <Route path='/Patient' element={<Pation/>}/>
                <Route path='/' element={<LandingPage/>}/>
            </Routes>
        )
    },[])


    //basename='/EHR-Dapp'
    return (

        <div className="App">
            <BrowserRouter >
                <Header />
                {path}
            </BrowserRouter>

        </div>
    );
    //                <Footer/>

}


export default App;
