import { createContext } from "react";
import { TokenData } from "util/requests";

export type AuthContextData = {
    authenticate: boolean,
    tokenData?: TokenData;
};

export type AuthContextType = {
    authContextData: AuthContextData,
    setAuthContextData: (authContextData: AuthContextData) => void;
}

export const AuthContext = createContext<AuthContextType>({
    authContextData: {
        authenticate: false,
    },
    setAuthContextData: () => null,
});