import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext.tsx";
import {useNavigate, useParams} from 'react-router-dom';
interface ICategory {
    id: number;
    name: string;
    color: string;
}

interface IPostUser{
    id:number
    firstname:string
    lastname:string
    email:string
    role:string
}


interface IPost{
    id:number
    title:string
    content:string
    imagePath:string
    createdAt:string
    updatedAt:string
    category:ICategory
    user:IPostUser
}
function EditPostForm() {
    const { user } = useAuth();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        imagePath: '',
        content: '',
        category_id: '',
    });
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        axios
            .get<ICategory[]>('http://172.16.33.151:3400/category')
            .then((res) => setCategories(res.data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        axios
            .get<IPost>(`http://172.16.33.151:3400/post/${id}`)
            .then(({ data }) => {
                if (!user || (data.user.id !== user.id && user.role !== "admin")) {
                    navigate("/"); // Assurez-vous que `navigate` est dans les dépendances
                    return;
                }
                setFormData({
                    title: data.title,
                    imagePath: data.imagePath,
                    content: data.content,
                    category_id: String(data.category.id),
                });
            })
            .catch((err) => {
                console.error(err);
                setError("Can't load post.");
            })
            .finally(() => setLoading(false));
    }, [id, navigate, user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        console.log("Champ modifié:", name, "Valeur:", value);
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { value } = e.target;
        console.log("Catégorie modifiée:", value);
        setFormData((prev) => ({ ...prev, category_id: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert("Vous devez être connecté pour modifier un post.");
            return;
        }

        console.log("Données envoyées:", formData); // Affiche les données à envoyer
        try {
            await axios.put(`http://172.16.33.151:3400/post/${id}`, {
                title: formData.title,
                imagePath: formData.imagePath,
                content: formData.content,
                category_id: formData.category_id,
                user_id: user.id,
            });

            setSuccess(true);
        } catch (error) {
            console.error('Error :', error);
            setSuccess(false);
        }
    };

    if (loading) {
        return <p className="text-center pt-24">loading…</p>;
    }
    if (error) {
        return <p className="text-red-500 text-center pt-24">{error}</p>;
    }

    return (
        <div className="flex items-start justify-center pt-24 px-4 w-screen min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-slate-800 p-8 rounded-2xl shadow-xl space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-300 font-jersey text-center">
                    Edit post
                </h2>

                {/* Title */}
                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Title
                        <p className="text-red-200">*</p>
                    </label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                        placeholder="Entrez le titre"
                        required
                        className="w-full bg-slate-700 placeholder:text-slate-400 text-white p-3 rounded"
                    />
                </div>

                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Content
                        <p className="text-red-200">*</p>
                    </label>
                    <textarea
                        name="content"
                        onChange={handleChange}
                        value={formData.content}
                        placeholder="Entrez le contenu"
                        required
                        className="w-full bg-slate-700 placeholder:text-slate-400 text-white p-3 rounded h-32 resize-none"
                    />
                </div>

                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Catégory
                        <p className="text-red-200">*</p>
                    </label>
                    <div className="bg-slate-700 rounded">
                        <select
                            name="category_id"
                            onChange={handleCategoryChange}
                            value={formData.category_id}
                            className="w-full p-3 placeholder:text-slate-400 text-white rounded bg-transparent"
                            required
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={String(cat.id)}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Image URL
                    </label>
                    <input
                        type="text"
                        name="imagePath"
                        onChange={handleChange}
                        value={formData.imagePath}
                        placeholder="https://..."
                        className="w-full bg-slate-700 placeholder:text-slate-400 text-white p-3 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-700 text-white p-3 rounded hover:bg-indigo-600 duration-100"
                >
                    Save
                </button>

                {success && (
                    <p className="text-green-700 text-center">
                        Post edited successfully!
                    </p>
                )}
            </form>
        </div>
    );
}

export default EditPostForm;
