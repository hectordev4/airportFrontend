import { createContext, useContext } from "react";
import Services from "./services";


const AppServiceContext = createContext(Services);

export const useAppService = () => {
    return useContext(AppServiceContext);
};

export const AppServiceProvider = ({ children }) => {
    return (
        <AppServiceContext.Provider value={Services}>
            {children}
        </AppServiceContext.Provider>
    );
};
