import React, {useEffect, useState} from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import {Admin,Doctor,Pation} from "./Pages/indexPages";
import {BrowserRouter,Routes , Route} from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import controler from "./controler";




function App () {


    let sender = window.ethereum.selectedAddress
    const a = new controler(sender)
    //console.log(sender)

    const getUserType = async () =>{
        console.log(await a.getUserType(window.ethereum.selectedAddress))
    }
    useEffect(()=>{getUserType()})

    window.ethereum.on('accountsChanged',getUserType)


    //basename='/EHR-Dapp'
    return (

        <div className="App">
            <BrowserRouter >
                <Header />
                <Routes>
                    <Route path='/Doctor'  element={<Doctor/>}/>
                    <Route path='/Admin'   element={<Admin/>}/>
                    <Route path='/Patient' element={<Pation/>}/>
                    <Route path='/' element={<LandingPage/>}/>
                </Routes>

            </BrowserRouter>

        </div>
    );
    //                <Footer/>

}


export default App;
