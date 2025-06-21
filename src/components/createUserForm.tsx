import { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext.tsx";

function CreateUserForm() {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        country: '',
        phone: '',
        role: 'user',
        language: '',
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                organisationId: user?.organisationId, // l'organisation de l'utilisateur connecté
            };

            console.log("Payload envoyé :", payload);
            await axios.post('http://127.0.0.1:3000/users', payload);
            setSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                country: '',
                phone: '',
                role: 'user',
                language: '',
            });
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
            setSuccess(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-4"
            >
                <h2 className="text-center text-blue-600 font-semibold text-sm">User</h2>
                <h1 className="text-2xl font-bold text-center text-gray-800">Create a user</h1>
                <p className="text-center text-gray-500 text-sm">Create a new user and permit it to manage visits</p>

                <div className="flex space-x-2">
                    <input
                        name="firstName"
                        type="text"
                        placeholder="Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-1/2 bg-gray-100 p-3 rounded border border-gray-300"
                        required
                    />
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-1/2 bg-gray-100 p-3 rounded border border-gray-300"
                        required
                    />
                </div>
                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-100 p-3 rounded border border-gray-300"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-gray-100 p-3 rounded border border-gray-300"
                    required
                />
                <input
                    name="country"
                    type="text"
                    placeholder="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-gray-100 p-3 rounded border border-gray-300"
                />

                <input
                    name="phone"
                    type="tel"
                    placeholder="+33 ..."
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-100 p-3 rounded border border-gray-300"
                />


                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full bg-gray-100 p-3 rounded border border-gray-300"
                    >
                        <option value="user">User</option>
                        <option value="guide">Guide</option>
                        {user?.role == 'admin' && (<option value="admin">Admin</option> )}
                    </select>


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-3 rounded hover:bg-blue-500 transition"
                >
                    Create user
                </button>
                {success && (
                    <p className="text-center text-green-500 mt-2">
                        Utilisateur créé avec succès !
                    </p>
                )}
            </form>
        </div>
    );
}

export default CreateUserForm;
