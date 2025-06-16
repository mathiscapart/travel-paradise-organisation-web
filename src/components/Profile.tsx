import {useAuth} from "../context/AuthContext.tsx";
import {Link} from "react-router-dom";

function Profile() {

    const user = useAuth().user;
    return(
        <>
            <div className="mt-16">
            <h1 className={"text-2xl ml-10 text-indigo-700"}>Profile</h1>
                <h1 className={"text-indigo-500 text-3xl ml-10 mb-3"}>{user?.email}</h1>
                <Link to={"/user/edit/"+ user?.id} className={"bg-indigo-500 px-2 py-1 text-white rounded ml-10"}>Modifier ses informations</Link>
                <div className="flex flex-col w-screen ">
                </div>
            </div>
        </>
    )

}

export default Profile;