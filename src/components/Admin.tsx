import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


interface IPostUser {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}

interface ICategory {
    id: number;
    name: string;
    color: string;
}

interface IPost {
    id: number;
    title: string;
    content: string;
    imagePath: string;
    createdAt: string;
    updatedAt: string;
    category: ICategory;
    user: IPostUser;
}

function Admin() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [view, setView] = useState<'users' | 'categories' | 'posts' | null>(null);
    const [users, setUsers] = useState<IPostUser[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://172.16.33.151:3400/user');
            setUsers(data);
        } catch (error) {
            console.error('Error loading users :', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('http://172.16.33.151:3400/category');
            setCategories(data);
        } catch (error) {
            console.error('Erreur loading categories :', error);
        }
    };

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get('http://172.16.33.151:3400/post');
            setPosts(data);
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    };



    const renderTable = () => {
        switch (view) {
            case 'users':
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-slate-800 text-gray-300">
                            <thead>
                            <tr className="bg-slate-700  " >
                                <th className="py-2 px-4 border-b">Firstname</th>
                                <th className="py-2 px-4 border-b">Lastname</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Role</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="">
                                    <td className="py-2 px-4 border-b">{u.firstname}</td>
                                    <td className="py-2 px-4 border-b">{u.lastname}</td>
                                    <td className="py-2 px-4 border-b">{u.email}</td>
                                    <td className="py-2 px-4 border-b">{u.role}</td>
                                    <td className="py-2 px-4 border-b">
                                        <Link to={`/user/edit/${u.id}`} className="mr-2 text-blue-500 hover:underline">Edit</Link>
                                        <Link to={`/user/delete/${u.id}`} onClick={(e) => {
                                            if (!window.confirm('Are you sure you want to delete this user ?')) {
                                                e.preventDefault();
                                            }
                                        }} className="mr-2 text-red-500 hover:underline">Delete</Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'categories':
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-slate-800 text-gray-300">
                            <thead>
                            <tr className="bg-slate-700  ">
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Color</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories.map((c) => (
                                <tr key={c.id}>
                                    <td className="py-2 px-4 border-b">{c.name}</td>
                                    <td className="py-2 px-4 border-b">
                                        <div className="rounded-full h-4 w-4 " style={{backgroundColor: c.color}}></div>
                                    </td>

                                    <td className="py-2 px-4 border-b">
                                        <Link to={`/category/edit/${c.id}`} className="mr-2 text-blue-500 hover:underline">Edit</Link>
                                        <Link to={`/category/delete/${c.id}`} onClick={(e) => {
                                            if (!window.confirm('Are you sure you want to delete this category?')) {
                                                e.preventDefault();
                                            }
                                        }} className="mr-2 text-red-500 hover:underline">Delete</Link></td>


                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'posts':
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-slate-800 text-gray-300">
                            <thead>
                            <tr className="bg-slate-700  ">
                                <th className="py-2 px-4 border-b">Title</th>
                                <th className="py-2 px-4 border-b">Author</th>
                                <th className="py-2 px-4 border-b">Category</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {posts.map((p) => (
                                <tr key={p.id}>
                                    <td className="py-2 px-4 border-b">{p.title}</td>
                                    <td className="py-2 px-4 border-b">{`${p.user.firstname} ${p.user.lastname}`}</td>
                                    <td className="py-2 px-4 border-b">{p.category.name}</td>
                                    <td className="py-2 px-4 border-b">
                                        <Link to={`/post/edit/${p.id}`} className="mr-2 text-blue-500 hover:underline">Edit</Link>
                                        <Link to={`/post/delete/${p.id}`} onClick={(e) => {
                                            if (!window.confirm('Are you sure you want to delete this post?')) {
                                                e.preventDefault();
                                            }
                                        }} className="mr-2 text-red-500 hover:underline">Delete</Link> </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleViewChange = (newView: 'users' | 'categories' | 'posts') => {
        setView(newView);
        if (newView === 'users') fetchUsers();
        if (newView === 'categories') fetchCategories();
        if (newView === 'posts') fetchPosts();
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-400 mb-4">Admin panel</h1>
            <div className="flex space-x-4 mb-6">
                <button onClick={() => handleViewChange('users')} className="bg-blue-500 text-white px-4 py-2 rounded">Users</button>
                <button onClick={() => handleViewChange('categories')} className="bg-green-500 text-white px-4 py-2 rounded">Categories</button>
                <button onClick={() => handleViewChange('posts')} className="bg-purple-500 text-white px-4 py-2 rounded">Posts</button>
            </div>
            {renderTable()}
        </div>
    );
}

export default Admin;
