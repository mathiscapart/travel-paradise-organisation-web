import { Link, NavLink } from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import {
    PlusIcon,
    Squares2X2Icon,
    CalendarIcon,
    SunIcon,
    UsersIcon,
    ChevronRightIcon, ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

function Nav() {

    const user = useAuth().user;
    console.log(user)

    return (
        <div className="min-w-70 w-1/6 h-screen font-vietnam bg-white shadow-xl flex flex-col justify-start pt-10 gap-7 items-center">
            <Link to="/" className="">
                <img className="h-10" src="/Logo.png" alt="Travel Logo" />
            </Link>
            <Link
                to="/"
                className="flex justify-center gap-3 items-center mb-5 w-6/7 h-10 bg-blue-600 text-white rounded hover:text-blue-100 hover:bg-blue-700 duration-200"
            >
                <PlusIcon className="h-5" /> Create a reservation
            </Link>
            <div className="flex flex-col w-6/7 text-blue-950 gap-4">
                <h2>Menu</h2>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-blue-50 flex justify-start pl-4 gap-3 items-center w-full h-10 rounded duration-200 hover:bg-blue-100"
                            : "flex justify-start pl-4 gap-3 items-center w-full h-10 rounded duration-200 hover:bg-blue-100"
                    }
                >
                    <Squares2X2Icon className="h-5" /> Overview
                </NavLink>
                <NavLink
                    to="/reservations"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-blue-50 flex justify-start pl-4 gap-3 items-center w-full h-10 rounded duration-200 hover:bg-blue-100"
                            : "flex justify-start pl-4 gap-3 items-center w-full h-10 rounded duration-200 hover:bg-blue-100"
                    }
                >
                    <CalendarIcon className="h-5" /> Reservations
                </NavLink>
                <NavLink
                    to="/visits"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-blue-50 flex justify-between pl-4 pr-3 gap-3 items-center w-full h-10 rounded duration-200 hover:bg-blue-100"
                            : "flex justify-between pl-4 pr-3 gap-3 items-center w-full h-10 rounded duration-200 hover:bg-blue-100"
                    }
                >
                    <div className="flex items-center gap-3">
                        <SunIcon className="h-5" /> Visits
                    </div>

                </NavLink>
                <div className="flex flex-col">
                    <button className="flex justify-between pl-4 pr-3 items-center w-full h-10 text-blue-950 rounded duration-200 hover:bg-blue-100">
                        <div className="flex items-center gap-3">
                            <UsersIcon className="h-5" /> Teams
                        </div>
                        </button>
                    <div className="flex flex-col pl-8 gap-2 text-blue-950 text-gray-400">
                        <NavLink
                            to="/users"
                            className="flex items-center gap-3 hover:text-blue-600"
                        >
                            Users
                            <ChevronRightIcon className="h-3" />
                        </NavLink>
                        <NavLink
                            to="/guides"
                            className="flex items-center gap-3 hover:text-blue-600"
                        >
                            Guides
                            <ChevronRightIcon className="h-3" />
                        </NavLink>

                        {user?.role == 'admin' && (
                        <NavLink
                            to="/admins"
                            className="flex items-center gap-3 hover:text-blue-600"
                        >
                            Admin
                            <ChevronRightIcon className="h-3" />
                        </NavLink> )}
                    </div>
                </div>

            </div>
            <div className="flex flex-col w-6/7 gap-2 mt-auto mb-5">
                <h3>Profile</h3>
                <div className="flex items-center gap-3">
                    <img
                        src={`https://i.pravatar.cc/150?img=3`} // Image d'avatar fictive
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col text-sm text-blue-950">
                        <span>{user?.lastName} {user?.firstName}</span>
                        <span className="text-gray-400">{user?.email}</span>
                    </div>
                </div>
                <NavLink to="/logout" className="flex justify-center items-center w-full h-10 bg-blue-50 text-blue-950 rounded hover:bg-blue-100 hover:text-blue-600 duration-200">
                    <ArrowLeftStartOnRectangleIcon className="h-5" /> Log out
                </NavLink>
            </div>
        </div>
    );
}

export default Nav;