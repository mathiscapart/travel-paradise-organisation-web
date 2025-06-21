import { useState } from 'react';
import axios from 'axios';

function CreateOrganisationForm() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        country: '',
        address: '',
        isAuthorized: false,
        logo: ''
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type ===  value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Payload envoyé :', formData);
            await axios.post('http://127.0.0.1:3000/organisations', formData);
            setSuccess(true);
            setFormData({
                name: '',
                description: '',
                country: '',
                address: '',
                isAuthorized: false,
                logo: ''
            });
        } catch (error) {
            console.error("Erreur lors de la création de l'organisation :", error);
            setSuccess(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl space-y-4"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Create Organisation</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Organisation Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded"
                />

                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded"
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded"
                />

                <input
                    type="text"
                    name="logo"
                    placeholder="Logo URL"
                    value={formData.logo}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded"
                />



                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-600 transition duration-150"
                >
                    Create
                </button>

                {success && (
                    <p className="text-green-600 text-center mt-4">
                        Organisation créée avec succès !
                    </p>
                )}
            </form>
        </div>
    );
}

export default CreateOrganisationForm;
