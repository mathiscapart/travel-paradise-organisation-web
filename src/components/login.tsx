import { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import CheckUserCredentials from "./user.api.ts";
import { useNavigate } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const userResp = await CheckUserCredentials(email, password);

        if (userResp) {
            const { id: userId, role: userRole } = userResp;

            login({
                id: userId,
                email,
                password,
                role: userRole,
            });
            setIsLogged(true);
            navigate("/");
        } else {
            setIsLogged(false);
            alert("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-screen gap-3 mt-14 p-5 ">
            <div className="flex flex-col justify-center items-center  w-1/3 bg-slate-900 p-5 rounded-2xl shadow-xl space-y-6">
                <h2 className="text-indigo-500 font-jersey text-3xl">Welcome back!</h2>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    className="w-2/3 pt-3 bg-slate-800 rounded-md text-sm font-medium text-gray-300 p-2"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="w-2/3 pt-3 bg-slate-800 rounded-md text-sm font-medium text-gray-300 p-2"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="flex gap-1 text-gray-500">
                    Don't have an account ?{" "}
                    <span className="text-indigo-500 underline hover:text-indigo-400 duration-200">
            Register Now!
          </span>
                </p>
                {isLogged && <h3>User logged</h3>}
                <button type="submit" className="bg-blue-900 text-white py-2 px-4 rounded">
                    Log In
                </button>
            </div>
        </form>
    );
}

export default Login;
