import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from './Alert';


const WalletContext = createContext();
export const useWallet = () => useContext(WalletContext);

export function WalletProvider({children}) {

    const navigate = useNavigate();
    const [wallet, setWallet] = useState(false);
    const [isNewUser, setIsNewUser] = useState();
    const [signer, setSigner] = useState();
    const contractAddress = '0x406AB5033423Dcb6391Ac9eEEad73294FA82Cfbc'

    const Connect = async () => {
        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setWallet(address);
            setSigner(signer);

            const nonceRes = await axios.post(
                "http://localhost:8000/api/nonce/",
                { wallet: address }
            );
            setIsNewUser(nonceRes.data.is_new_user);



            const nonce = String(nonceRes.data.nonce);
            const signature = await signer.signMessage(nonce);

            const response = await axios.post(
                "http://localhost:8000/api/verify-signature/",
                {
                    wallet: address,
                    signature: signature,
                }
            );

            localStorage.setItem('token', response.data.access);
            console.log("Wallet connected successfully");
            if (!nonceRes.data.is_new_user) {
                Alert("Login Successful", "success")
                localStorage.setItem('contractAddress', contractAddress);
                localStorage.setItem('wallet', address);
                navigate('/dashboard');
                // window.location.href = '/dashboard'
            }

        } catch (error) {
            console.error("Detailed error:", error);
            alert(`Failed to connect wallet: ${error.message}`);
        }
    }
    return (<WalletContext.Provider value={{ Connect, wallet, isNewUser, signer }}> 
        {children}
    </WalletContext.Provider>
    );
}
