import React, {useEffect, useState} from "react";
import Header from "./Components/Header";
import {Admin,Doctor,Pation , Company} from "./Pages/indexPages";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./Components/LandingPage";





function App () {
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
