import { createContext, useContext } from "react";
import Services from "../middleware/services";


const AppServiceContext = createContext(Services);

export const useAppService = () => useContext(AppServiceContext);

export const AppServiceProvider = ({ children }) => {
    return (
        <AppServiceContext.Provider value={Services}>
            {children}
        </AppServiceContext.Provider>
    );
};

