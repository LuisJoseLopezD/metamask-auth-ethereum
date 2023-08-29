"use client"
import React, { createContext, useState, ReactNode, useContext } from "react";

interface DataContextType {
    walletAdress: string;
    setWalletAdress: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
export const DataContext = createContext<DataContextType | undefined>(undefined);

// Define the DataProvider props
interface DataProviderProps {
    children: ReactNode;
}

// Create the DataProvider component
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    
    const [walletAdress, setWalletAdress] = useState("");

    const contextValues: DataContextType = {
        walletAdress, setWalletAdress
    };

    return (
        <DataContext.Provider value={contextValues}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
};