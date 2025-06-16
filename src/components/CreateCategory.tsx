import {  useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext.tsx";

function CreateCategoryForm() {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        color: '',
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert("Vous devez être connecté pour créer une catégorie.");
            return;
        }

        try {
            await axios.post('http://172.16.33.151:3400/category', {
                name: formData.name,
                color: formData.color,
            });

            setSuccess(true);
            setFormData({ name: '', color: '' });
        } catch (error) {
            console.error('Erreur lors de la création de la catégorie :', error);
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
                    Create a category
                </h2>

                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Category name
                        <p className="text-red-200">*</p>
                    </label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        placeholder="Entrez le nom"
                        required
                        className="w-full bg-slate-700 placeholder:text-slate-400 text-white p-3 rounded"
                    />
                </div>

                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Color
                        <p className="text-red-200">*</p>
                    </label>
                    <input
                        type="color"
                        name="color"
                        onChange={handleChange}
                        value={formData.color || '#008080'}
                        required
                        className="w-16 h-10 p-0 border-0 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-700 text-white p-3 rounded hover:bg-indigo-600 duration-100"
                >
                    Créer
                </button>

                {success && (
                    <p className="text-green-700 text-center">
                        Category successfully created!
                    </p>
                )}
            </form>
        </div>
    );
}

export default CreateCategoryForm;
