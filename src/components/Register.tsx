import { useState } from 'react';
import axios from 'axios';
function RegisterForm() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'user',
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post('http://172.16.33.151:3400/user', {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            });

            setSuccess(true);
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                role: 'user',
            });
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement :', error);
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
                    Inscription
                </h2>

                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Prénom
                        <p className="text-red-200">*</p>
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        onChange={handleChange}
                        value={formData.firstname}
                        placeholder="Entrez votre prénom"
                        required
                        className="w-full bg-slate-700 placeholder:text-slate-400 text-white p-3 rounded"
                    />
                </div>

                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Nom
                        <p className="text-red-200">*</p>
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                        value={formData.lastname}
                        placeholder="Entrez votre nom"
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
                        placeholder="Entrez votre email"
                        required
                        className="w-full bg-slate-700 placeholder:text-slate-400 text-white p-3 rounded"
                    />
                </div>

                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Mot de passe
                        <p className="text-red-200">*</p>
                    </label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        placeholder="Entrez un mot de passe"
                        required
                        className="w-full bg-slate-700 placeholder:text-slate-400 text-white p-3 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-700 text-white p-3 rounded hover:bg-indigo-600 duration-100"
                >
                    S’inscrire
                </button>

                {success && (
                    <p className="text-green-700 text-center">
                        Inscription réussi!
                    </p>
                )}
            </form>
        </div>
    );
}

export default RegisterForm;
