import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IUser, useAuth } from "../context/AuthContext.tsx";
import { useEffect, useState } from "react";


interface ICategory {
    id: number;
    name: string;
    color: string;
}

interface IPostUser {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
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

function DeletePost() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const user: IUser | null = useAuth().user;
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        const deletePost = async () => {
            if (!id || !user) {
                navigate("/");
                return;
            }

            try {
                const { data } = await axios.get<IPost>(`http://172.16.33.151:3400/post/${id}`);
                if (data.user.id !== user.id && user.role !== "admin") {
                    navigate("/");
                    return;
                }

                const res = await axios.delete(`http://172.16.33.151:3400/post/${id}`);
                if (res.status === 200) {
                    setDeleted(true);
                } else {
                    console.error("failed to delete post");
                }
            } catch (err) {
                console.error(err);
                navigate("/");
            }
        };

        deletePost();
    }, [id, user, navigate]);

    if (!deleted) {
        return <p className="text-center pt-24 text-white">deleting...</p>;
    }

    return (
        <div className="w-screen flex flex-col justify-center items-center pt-24">
            <p className="text-green-400 mb-4">Post successfully deleted !</p>
            <Link
                to="/"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full transition duration-200"
            >
                Back home
            </Link>
        </div>
    );
}

export default DeletePost;
