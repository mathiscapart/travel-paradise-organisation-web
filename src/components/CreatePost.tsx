import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext.tsx";
interface ICategory {
    id: number;
    name: string;
    color: string;
}

function CreatePostForm() {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        imagePath: '',
        content: '',
        category_id: '',
    });

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        axios
            .get<ICategory[]>('http://172.16.33.151:3400/category')
            .then((res) => setCategories(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCategoryChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFormData((prev) => ({ ...prev, category_id: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert("Vous devez être connecté pour créer un post.");
            return;
        }

        try {
            await axios.post('http://172.16.33.151:3400/post', {
                title: formData.title,
                imagePath: formData.imagePath,
                content: formData.content,
                category_id: formData.category_id,
                user_id: user.id,
            });

            setSuccess(true);
            setFormData({ title: '', imagePath: '', content: '', category_id: '' });
        } catch (error) {
            console.error('Error creating post:', error);
            setSuccess(false);
        }
    };

    return (
        <div className="flex items-start justify-center pt-24 px-4 w-screen min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-slate-800 p-8 rounded-2xl shadow-xl space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-300 font-jersey text-center">
                    Create new post
                </h2>
                <div className="">
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Post Title
                        <p className={"text-red-200"}>*</p>
                    </label>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={formData.title}
                    placeholder="Enter title"
                    required
                    className="w-full bg-slate-700 placeholder:text-slate-400 text-white p-3 rounded"
                />
                </div>
                <div className="">
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Post content
                        <p className={"text-red-200"}>*</p>
                    </label>
                <textarea
                    name="content"
                    onChange={handleChange}
                    value={formData.content}
                    placeholder="Enter content"
                    required
                    className="w-full bg-slate-700 placeholder:text-slate-400 text-white p-3 rounded h-32 resize-none"
                />
                </div>
                <div>
                    <label className="font-medium mb-1 flex text-indigo-500">
                        Existing category
                        <p className={"text-red-200"}>*</p>
                    </label>
                    <div className="bg-slate-700 rounded">
                    <select
                        name="category_id"
                        onChange={handleCategoryChange}
                        value={formData.category_id}
                        className="w-full p-3 placeholder:text-slate-400 text-white rounded bg-transparent"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={String(cat.id)}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    </div>
                </div>

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
                    Publier
                </button>

                {success && (
                    <p className="text-green-700 text-center">
                        Post created successfully!
                    </p>
                )}
            </form>
        </div>
    );
}

export default CreatePostForm;
