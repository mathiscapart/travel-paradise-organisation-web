import {ICategory} from "./Categories.tsx"
import {useEffect, useState} from "react";
import axios from "axios";
import {IUser, useAuth} from "../context/AuthContext.tsx";
import {Link} from "react-router-dom";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid";

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
interface PostsProps {
    filterCategory: ICategory | null;
    filterUser: IUser| null;
}

function Posts({ filterCategory, filterUser }: PostsProps) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [displayedPost, setDisplayedPost] = useState<IPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error] = useState<string | null>(null);

    const user = useAuth().user

    function IsAdmin() {
        return user?.role === "admin"
    }
    useEffect(() => {
        async function fetchPosts() {
            try {
                const { data } = await axios.get<IPost[]>("http://172.16.33.151:3400/post");
                console.log(data);
                setPosts(data);
            } catch (err) {
                if (err instanceof Error) {
                    console.error('Error:', err.message);
                } else {
                    console.error('An unexpected non-error value was thrown:', err);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    useEffect(() => {
        let filtered = posts;

        if (filterCategory) {
            filtered = filtered.filter(post => post.category.id === filterCategory.id);
        }

        if (filterUser) {
            filtered = filtered.filter(post => post.user.id === filterUser.id);
        }

        setDisplayedPost(filtered);
    }, [posts, filterCategory, filterUser]);

    if (loading) return <p>Loading posts…</p>;
    if (error) return <p className="text-red-500">{error}</p>;


    return (
        <>

        <div className="z-40 pt-5 mx-10 flex flex-col justify mb-16">

            {filterCategory ? (
                <h2 className="text-gray-500 font-jersey text-2xl">
                    Posts in {filterCategory.name}, {displayedPost.length} results found
                </h2>
            ) : (
                <h2 className="text-gray-500 font-jersey text-2xl">All posts</h2>
            )}
            {displayedPost.length === 0 ? (
                <p className={"text-gray-500"}>No post{filterCategory ? " in this category" : ""}.</p>
            ) : (
                <ul className="space-y-4">
                    {displayedPost.map((post) => (
                        <li
                            key={post.id}
                            className="border rounded-2xl flex flex-col gap-10  hover:shadow-md transition-shadow mx-auto  shadow border-gray-800  max-w-1/2 relative"
                        >
                            <img className={" rounded-t-2xl "} src={post.imagePath} alt=""/>
                            <div className=" flex justify-between items-center w-full">
                                <div className="flex items-center gap-5">
                                    <h3 className="text-lg ml-5 font-semibold font-jersey text-indigo-500">{post.title}</h3>
                                    {(filterUser || IsAdmin()) && <div className=" flex  justify-center items-center border-b border-gray-700 ">
                                        <PencilIcon className={"h-4 text-gray-700 w-5"}/>
                                     <Link to={"/post/edit/"+post.id} className={" text-gray-700"}>Edit</Link>
                                    </div>}
                                    {(filterUser || IsAdmin()) && <div className=" flex  justify-center items-center border-b border-gray-700 ">
                                        <TrashIcon className={"h-4 text-gray-700 w-5"}/>
                                     <Link to={"/post/delete/"+post.id} className={" text-gray-700"}>Remove</Link>

                                    </div>}

                                </div>
                                <div className="mr-5 my-1 px-5 flex justify-center items-center rounded-full gap-2 text-gray-300">
                                    <div className="rounded-full h-4 w-4 " style={{backgroundColor: post.category.color}}></div>
                                    {post.category.name}
                                </div>
                            </div>

                            <p className=" mx-5 text-gray-300 mb-10 text-justify">{post.content}</p>
                            <p className="absolute bottom-3 right-10 font-jersey text-gray-700">{post.updatedAt.slice(0,10)} / {post.updatedAt.slice(11,16)}</p>
                            <p className="absolute bottom-3 left-5 font-jersey text-gray-700">Author : {post.user.firstname} {post.user.lastname}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>


        </>
    );
}
export default Posts;