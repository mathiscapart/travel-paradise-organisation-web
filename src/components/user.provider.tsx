import {useEffect, useState} from "react";
import AuthContext, {IUser} from "../context/AuthContext.tsx";

interface UserProviderProps {
    children:React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user,setUser] = useState<IUser|null>(null)
    const login = (userData:IUser) => {
        setUser(userData);
        localStorage.setItem("user",JSON.stringify(userData));
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    useEffect(() => {
        const token = localStorage.getItem("user");
        if (token){
            setUser(JSON.parse(token));
        }
    }, []);

    const value = {
        user,login,logout
    }

    useEffect(() => {},[])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}