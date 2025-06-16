import {Link} from "react-router-dom";


function LogoutPage(){
    localStorage.removeItem("user");

    return (<>
        <div className="w-screen flex items-center justify-center text-white flex-col gap-5">
        <h1 className={"text-bold"}>You have been logged out</h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
        </svg>
            <Link to={"/"} className={"bg-indigo-500 px-3 py-1 rounded text-white"}>Go home page</Link>
        </div>

    </>
    )
}

export default LogoutPage;