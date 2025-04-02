import { createContext, useContext } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const FlyService  = {
    baseUrl: BASE_URL,
    
    getAirports: async () => {
        try{
            const response = await axios.get(`${BASE_URL}/airports`);
            return response.data;
        }catch(error){
            console.error("Error retrieving airports:", error);
            throw error;
        }
    },
    getFlights: async () => {
        try{
            const response = await axios.get(`${BASE_URL}/flights`);
            return response.data;
        }catch(error){
            console.error("Error retrieving flights:", error);
            throw error;
        }
    },
    getPlanes: async () => {
        try{
            const response = await axios.get(`${BASE_URL}/planes`);
            return response.data;
        }catch(error){
            console.error("Error retrieving planes:", error);
            throw error;
        }
    },
}

const FlyServiceContext = createContext(FlyService);

export const useFlyService = () => {
    return useContext(FlyServiceContext);
};

export const FlyServiceProvider = ({ children }) => {
    return (
        <FlyServiceContext.Provider value={FlyService}>
            {children}
        </FlyServiceContext.Provider>
    );
};

export default FlyService;