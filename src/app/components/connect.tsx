"use client"
import { useEffect, useState } from 'react';
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider
    }
}

//state
import { useDataContext } from "../context/DataContext";

const Connect = () => {

    const { walletAdress, setWalletAdress } = useDataContext();

    // connect wallet
    const connectWallet = async () => {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            try {
                // metamask is installed
                const accounts: any = await window.ethereum.request({ method: "eth_requestAccounts" });
                setWalletAdress(accounts[0]);

            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("you need to install metamask first")
        }
    }

    //get current wallet
    const getCurrentWalletConnected = async () => {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            try {
                // we are already connected to metamask
                const accounts: any = await window.ethereum.request({
                    method: "eth_accounts"
                });

                if (accounts.length > 0) {
                    setWalletAdress(accounts[0]);
                } else {
                    console.log("Connect to metamask using the connect button!!!")
                }

            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("you need to install metamask first")
        }
    }

    //change wallets
    const addWalletListener = async () => {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            try {
                window.ethereum.on("accountsChanged", (accounts:any) => {
                    setWalletAdress(accounts[0]);
                })

            } catch (err) {
                console.log(err);
            }
        } else {
            // disconnecting...
            setWalletAdress("");
            console.log("you need to install metamask first")
        }
    }

    useEffect(() => {
        setWalletAdress(walletAdress);
        console.log(walletAdress);
    }, [walletAdress]);

    useEffect(() => {
        getCurrentWalletConnected();
        addWalletListener();
    }, []);

    return (
        <>
            <div className="container flex flex-col items-center p-4">

                <button
                    onClick={() => connectWallet()}
                    className="w-64 cursor-pointer rounded text-white bg-red-500">
                    Connect to wallet
                </button>

                {walletAdress && walletAdress.length > 0 ?
                    <p className="text-sm">
                        {walletAdress}
                    </p>
                    :
                    null
                }

            </div>
        </>
    )
}

export default Connect;
