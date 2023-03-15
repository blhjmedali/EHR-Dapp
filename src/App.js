import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {Admin,Doctor,Pation} from "./Pages/indexPages";
import {BrowserRouter,Routes , Route} from "react-router-dom";
import Web3 from "web3";
import LandingPage from "./Components/LandingPage";

async function connectToMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        // Use MetaMask provider
        const provider = window.ethereum;
        try {
            // Request account access
            await provider.request({ method: 'eth_requestAccounts' });
            // Create a new Web3 instance
            const web3 = new Web3(provider);
            // Get the user's Ethereum address
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
            console.log(`Connected to MetaMask with address: ${address}`);
            return web3;
        } catch (error) {
            console.error('Failed to connect to MetaMask', error);
        }
    } else {
        console.error('MetaMask is not installed');
    }
}







function handlerRequestMetaMask(){
    let {ethereum}=window
    ethereum.request({method:'eth_requestAccounts'})
}

function App () {


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
