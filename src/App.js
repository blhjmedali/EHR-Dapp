import React, {useEffect, useState} from "react";
import Header from "./Components/Header";
import {Admin,Doctor,Pation , Company} from "./Pages/indexPages";
import {BrowserRouter, Routes, Route, useNavigate,Link} from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import controler from "./controler";





function App () {


    let a = new controler(window.ethereum.selectedAddress)

    const getUserType = async () =>{
        const user_type =  await a.getUserType(window.ethereum.selectedAddress)
        if (user_type==="Admin"){
            console.log("Admin")
        }
        if (user_type==="Doctor"){
            console.log("Doctor")
        }
        if (user_type==="Patient"){
            console.log("Patient")
        }
        if (user_type==="Company"){
            console.log("Company")
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
                <Route path='/Company' element={<Company/>}/>
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
}


export default App;
