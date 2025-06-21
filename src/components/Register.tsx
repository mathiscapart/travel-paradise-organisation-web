import { useState } from 'react';
import axios from 'axios';

function RegisterWithOrganisationForm() {
    const [orgData, setOrgData] = useState({
        name: '',
        description: '',
        country: '',
        address: '',
        logo: ''
    });

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'admin',
        country: '',
        phone: '',
        language: '',
        avatar: '' // Champ requis côté back
    });

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrgData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccess(false);

        try {
            const orgResponse = await axios.post('http://127.0.0.1:3000/organisations', {
                ...orgData,
                isAuthorized: false
            });

            const orgId = orgResponse.data.id;

            await axios.post('http://127.0.0.1:3000/users', {
                ...userData,
                organisationId: orgId
            });

            setSuccess(true);
            setOrgData({
                name: '',
                description: '',
                country: '',
                address: '',
                logo: ''
            });
            setUserData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                role: 'admin',
                country: '',
                phone: '',
                language: '',
                avatar: ''
            });
        } catch (error: any) {
            console.error("Erreur lors de la création :", error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    setErrorMessage("L'organisation ou l'utilisateur existe déjà.");
                } else if (error.response?.status === 500) {
                    setErrorMessage("Erreur interne du serveur. Veuillez réessayer plus tard.");
                } else {
                    setErrorMessage("Erreur : " + error.response?.data?.message || error.message);
                }
            } else {
                setErrorMessage("Une erreur inattendue s’est produite.");
            }
        }
    };

    return (
        <div className="w-screen bg-white flex">
            <div className="flex-1 flex items-center justify-center bg-gray-100 h-screen p-5">
                <img
                    className="w-full h-full object-cover rounded-xl"
                    src="https://images.unsplash.com/photo-1487553333251-6c8e26d3dc2c?q=80&w=1287&auto=format&fit=crop"
                    alt="Plane"
                />
            </div>
            <div className="flex-1 flex items-center justify-center">
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-8 bg-white rounded-lg">
                    <h2 className="text-3xl font-bold text-gray-800">Register Organisation</h2>
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">Login</a>
                    </p>

                    <input type="text" name="name" placeholder="Organisation Name" value={orgData.name} onChange={handleOrgChange} required className="w-full p-3 bg-blue-50 rounded-md" />
                    <input type="text" name="description" placeholder="Description" value={orgData.description} onChange={handleOrgChange} className="w-full p-3 bg-blue-50 rounded-md" />
                    <input type="text" name="country" placeholder="Organisation Country" value={orgData.country} onChange={handleOrgChange} className="w-full p-3 bg-blue-50 rounded-md" />
                    <input type="text" name="address" placeholder="Address" value={orgData.address} onChange={handleOrgChange} className="w-full p-3 bg-blue-50 rounded-md" />
                    <input type="text" name="logo" placeholder="Logo URL" value={orgData.logo} onChange={handleOrgChange} className="w-full p-3 bg-blue-50 rounded-md" />

                    <hr className="my-4" />

                    <div className="flex space-x-4">
                        <input type="text" name="firstName" placeholder="First name" value={userData.firstName} onChange={handleUserChange} required className="w-1/2 p-3 bg-blue-50 rounded-md" />
                        <input type="text" name="lastName" placeholder="Last name" value={userData.lastName} onChange={handleUserChange} required className="w-1/2 p-3 bg-blue-50 rounded-md" />
                    </div>
                    <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleUserChange} required className="w-full p-3 bg-blue-50 rounded-md" />
                    <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleUserChange} required className="w-full p-3 bg-blue-50 rounded-md" />
                    <input type="text" name="country" placeholder="User Country" value={userData.country} onChange={handleUserChange} className="w-full p-3 bg-blue-50 rounded-md" />
                    <input type="text" name="phone" placeholder="Phone" value={userData.phone} onChange={handleUserChange} className="w-full p-3 bg-blue-50 rounded-md" />
                    <input type="text" name="language" placeholder="Language" value={userData.language} onChange={handleUserChange} className="w-full p-3 bg-blue-50 rounded-md" />
                    <input type="text" name="avatar" placeholder="Avatar (URL)" value={userData.avatar} onChange={handleUserChange} className="w-full p-3 bg-blue-50 rounded-md" />

                    <button type="submit" className="w-2/3 bg-blue-600 text-white py-3 rounded-md">Register</button>

                    {success && <p className="text-green-500 text-center">Organisation et admin créés avec succès !</p>}
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
}

export default RegisterWithOrganisationForm;
