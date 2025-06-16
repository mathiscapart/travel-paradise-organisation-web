import {createContext,  useContext} from 'react';
export interface IUser{
    id:number;
    email : string;
    password: string;
    role: string;
}
interface IAuthProps {
    user : IUser | null ;
    login : (user:IUser) => void;
    logout : () => void;
}
const AuthContextDefaultValue:IAuthProps = {
    user : {} as IUser,
    login: () => {},
    logout: () => {},
}

const AuthContext = createContext<IAuthProps>(AuthContextDefaultValue);
export function useAuth() {
    return useContext(AuthContext);
}
export default AuthContext;