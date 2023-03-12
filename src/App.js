import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {Admin,Doctor,Pation} from "./Pages/indexPages";
import {BrowserRouter,Routes , Route} from "react-router-dom";





function handlerRequestMetaMask(){
    let {ethereum}=window
    ethereum.request({method:'eth_requestAccounts'})
}
function handler(){
    const Web3 = require("web3")

    let web3 = new Web3(Web3.givenProvider)
    let accoounts = web3.eth.accounts;
    //<button onClick={handlerRequestMetaMask} className='btn btn-primary m-4'>Click</button>
    //                 <button onClick={handler} className='btn btn-warning m-4'>Click</button>
}

function App () {



    return (
        <div className="App">
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path='/Doctor' element={<Doctor/>}/>
                    <Route path='/Admin' element={<Admin/>}/>
                    <Route path='/Patient' element={<Pation/>}/>
                </Routes>

                <Footer/>
            </BrowserRouter>

        </div>
    );

}

export default App;
