import { createContext, useContext } from 'react';

export interface IUser {
    id: number;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    country: string;
    phone: string;
    language: string;
    organisationId: number;
}

interface IAuthProps {
    user: IUser | null;
    login: (user: IUser) => void;
    logout: () => void;
}

const AuthContextDefaultValue: IAuthProps = {
    user: null,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<IAuthProps>(AuthContextDefaultValue);

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthContext;
