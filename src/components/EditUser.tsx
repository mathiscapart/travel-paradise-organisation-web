import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
function EditUserForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const user = useAuth().user;

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'user',
    });

    interface IPayload {
        firstname: string;
        lastname: string;
        email: string;
        password?: string;
        role?: string;
    }

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (!id || !user) return;
            if (user.id !== +id && user.role !== "admin") {
                navigate("/");
                return;
            }

            try {
                const { data } = await axios.get(`http://172.16.33.151:3400/user/${id}`);
                setFormData({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    password: '',
                    role: data.role,
                });
            } catch (error) {
                console.error('Erreur lors du chargement du user :', error);
                navigate("/");
            }
        };

        fetchUser();
    }, [id, user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload:IPayload = {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
            };

            if (formData.password) {
                payload.password = formData.password;
            }

            if (user?.role === 'admin') {
                payload.role = formData.role;
            }

            await axios.put(`http://172.16.33.151:3400/user/${id}`, payload);

            setSuccess(true);
        } catch (error) {
            console.error('Error during edit :', error);
            setSuccess(false);
        }
    };

    return (
        <div className="flex items-start justify-center pt-24 px-4 w-screen min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-xl space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-300 text-center">
                    Edit user
                </h2>

                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Firstname
                        <p className="text-red-200">*</p>
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        onChange={handleChange}
                        value={formData.firstname}
                        required
                        className="w-full bg-slate-700 placeholder:text-slate-400 text-white p-3 rounded"
                    />
                </div>

                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Name
                        <p className="text-red-200">*</p>
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                        value={formData.lastname}
                        required
                        className="w-full bg-slate-700 placeholder:text-slate-400 text-white p-3 rounded"
                    />
                </div>

                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Email
                        <p className="text-red-200">*</p>
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        required
                        className="w-full bg-slate-700 placeholder:text-slate-400 text-white p-3 rounded"
                    />
                </div>

                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        className="w-full bg-slate-700 placeholder:text-slate-400 text-white p-3 rounded"
                    />
                </div>

                {user?.role === 'admin' && (
                    <div>
                        <label className="font-medium mb-1 flex text-indigo-500">
                            Role
                            <p className="text-red-200">*</p>
                        </label>
                        <select
                            name="role"
                            onChange={handleChange}
                            value={formData.role}
                            required
                            className="w-full bg-slate-700 text-white p-3 rounded"
                        >
                            <option value="user">User</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-indigo-700 text-white p-3 rounded hover:bg-indigo-600 duration-100"
                >
                    Edit
                </button>

                {success && (
                    <p className="text-green-700 text-center">
                        User successfully updated!
                    </p>
                )}
            </form>
        </div>
    );
}

export default EditUserForm;
