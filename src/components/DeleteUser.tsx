import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth, IUser } from "../context/AuthContext";
import axios from "axios";
function DeleteUser() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const user: IUser | null = useAuth().user;
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        const deleteUser = async () => {
            if (!id || !user || user.role !== "admin") {
                navigate("/");
                return;
            }

            try {
                const res = await axios.delete(`http://172.16.33.151:3400/user/${id}`);
                if (res.status === 200) {
                    setDeleted(true);
                } else {
                    console.error("Error during user deletion:");
                }
            } catch (err) {
                console.error(err);
                navigate("/");
            }
        };

        deleteUser();
    }, [id, user, navigate]);

    if (!deleted) {
        return <p className="text-center pt-24 text-white"> Deleting…</p>;
    }

    return (
        <div className="w-screen flex flex-col justify-center items-center pt-24">
            <p className="text-green-400 mb-4">User successfully deleted!</p>
            <Link
                to="/"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full transition duration-200"
            >
               Back home
            </Link>
        </div>
    );
}

export default DeleteUser;
