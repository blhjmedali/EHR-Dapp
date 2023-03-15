import React, {useState} from "react";
import Web3 from "web3";
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




function LandingPage(){
    const [wallet_address , walletHandler]= useState()
    const [balance , balanceHandler]= useState()

    const getAdress = async ()=>{
        const provider = window.ethereum;
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        walletHandler(accounts[0])
    }
    const getbalance = async ()=>{
        const provider = window.ethereum;
        const web3 = new Web3(provider);
        const balance = await web3.eth.getBalance(wallet_address)
        const ether = web3.utils.fromWei(balance,"ether")
        balanceHandler(ether)
    }


    window.ethereum.on('accountsChanged',getAdress)
    window.ethereum.on('connect',getAdress)

    return(
        <div className='bg-secondary vh-100' >
            <div className=' d-flex  justify-content-center ' >
                <div className=' w-50 bg-secondary border m-4 p-2  rounded shadow-sm'>
                    <button onClick={connectToMetaMask} className='btn btn-dark  shadow-sm m-2'>Connect Metamask</button>
                    <h6>Statue :</h6>
                    <button onClick={getAdress} className='btn btn-light shadow-sm m-2 '>Get Address </button>
                    <h6>Wallet address : {wallet_address}</h6>
                    <button onClick={getbalance} className='btn btn-light shadow-sm m-2 '>Get Balence </button>
                    <h6>balance : {balance}</h6>



                </div>
            </div>
        </div>
    )
}

export default LandingPage