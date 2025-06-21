import { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload extends IUser {
    iat: number;
    exp: number;
}


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
    if (response.ok && data.token) {
        const decoded = jwtDecode<JwtPayload>(data.token);

        login({
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            country: '',
            phone: '',
            language: '',
            organisationId: decoded.organisationId
        });

        setIsLogged(true);
        navigate("/");
    } else {
        setIsLogged(false);
        alert(data.error || "Invalid credentials");
    }
    };

    return (
        <div className="w-screen bg-white flex">
            <div className="flex-1 flex bg-white items-center justify-center bg-gray-100 h-screen p-5">
                <img
                    className="w-full h-full object-cover rounded-xl"
                    src="https://images.unsplash.com/photo-1487553333251-6c8e26d3dc2c?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Plane"
                />
            </div>
            <div className="flex-1 flex items-center justify-center">
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 p-8 bg-white rounded-lg">
                    <h2 className="text-3xl font-bold text-gray-800 ">Login</h2>
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-blue-50 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-blue-50 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button type="submit" className="w-2/3 bg-blue-600 text-white py-3 rounded-md">
                        Log In
                    </button>
                    <p className=" text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-600 hover:underline">
                            Register
                        </a>
                    </p>
                    {isLogged && <p className="text-green-500 ">User logged</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;