import axios from 'axios';
import {jwt_decode} from 'jwt-decode';
import { IUser } from '../context/AuthContext';

interface JwtPayload extends IUser {
    iat: number;
    exp: number;
}

async function CheckUserCredentials(
    email: string,
    password: string
): Promise<IUser | null> {
    const apiUrl = "http://172.16.33.151:3000/login";

    try {
        const res = await axios.post(apiUrl, { email, password });

        if (res.status === 200 && res.data?.token) {
            const decoded = jwt_decode<JwtPayload>(res.data.token);
            return {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                country: '',
                phone: '',
                language: '',
                organisationId: decoded.organisationId,

            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
}

export default CheckUserCredentials;
