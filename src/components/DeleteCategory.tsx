import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IUser, useAuth } from "../context/AuthContext.tsx";
import { useEffect, useState } from "react";

interface ICategory {
    id: number;
    name: string;
    color: string;
}
function DeleteCategory() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const user: IUser | null = useAuth().user;
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        const deleteCategory = async () => {
            if (!id || !user) {
                navigate("/");
                return;
            }

            try {
                await axios.get<ICategory>(`http://172.16.33.151:3400/category/${id}`);
                if (user.role !== "admin") {
                    navigate("/");
                    return;
                }

                const res = await axios.delete(`http://172.16.33.151:3400/category/${id}`);
                if (res.status === 200) {
                    setDeleted(true);
                } else {
                    console.error("Échec de la suppression");
                }
            } catch (err) {
                console.error(err);
                navigate("/");
            }
        };

        deleteCategory();
    }, [id, user, navigate]);

    if (!deleted) {
        return <p className="text-center pt-24 text-white">deleting…</p>;
    }

    return (
        <div className="w-screen flex flex-col justify-center items-center pt-24">
            <p className="text-green-400 mb-4">Category successfully deleted!</p>
            <Link
                to="/"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full transition duration-200"
            >
                back home
            </Link>
        </div>
    );
}

export default DeleteCategory;
