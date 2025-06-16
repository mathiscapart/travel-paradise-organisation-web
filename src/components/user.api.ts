import axios from 'axios';

interface LoginResponse {
    result: {
        id: number;
        role: string;
    };
}

interface UserCredentials {
    id: number;
    role: string;
}
async function CheckUserCredentials(
    email: string,
    password: string
): Promise<UserCredentials | null> {
    const apiUrl = "http://172.16.33.151:3400/login";
    try {
        const res = await axios.post<LoginResponse>(apiUrl, {
            email,
            password,
        });

        if (res.status === 200 && res.data && res.data.result) {
            return {
                id: res.data.result.id,
                role: res.data.result.role,
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
