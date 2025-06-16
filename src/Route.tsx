import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./components/Home.tsx";
import Layout from "./components/Layout.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import Login from "./components/login.tsx"
import Admin from "./components/Admin.tsx"
import {useAuth} from "./context/AuthContext.tsx";
import {UserProvider} from "./components/user.provider.tsx";
import RegisterForm from "./components/Register.tsx";
import Profile from "./components/Profile.tsx";
import LogoutPage from "./components/logout.tsx";
import EditUserForm from "./components/EditUser.tsx";
import DeleteUser from "./components/DeleteUser.tsx";


const router = createBrowserRouter(
    [
        {path:"/",
            element:<Layout/>,
            errorElement : <ErrorPage/>,
            children: [
                {path: "/",
                    element: <Home/>,
                },
                {path:"/login",

                    element:

                        <Login/>

                },
                {path: "/register",
                    element:<RegisterForm/>
                },

                {
                    path: "/profile",
                    element:<ProtectedRouteProfile/>
                },
                {path:"/logout",
                    element:
                        <LogoutPage/>,
                },
                {path: "/user/edit/:id",

                    element:
                        <UserProvider>
                            <ProtectedRouteUserEditForm/>
                        </UserProvider>
                },
                {path: "/user/delete/:id",
                    element:
                        <UserProvider>
                            <ProtectedRouteUserDeleteForm/>
                        </UserProvider>
                },


                {path:"/admin",
                    element: (
                        <UserProvider>
                            <ProtectedRouteAdmin ></ProtectedRouteAdmin>
                        </UserProvider>
                    )
                }

            ]}

    ]);

function Route() {
    return <RouterProvider router={router}/>;

}

function ProtectedRouteAdmin() {
    const auth = useAuth();
    if(auth.user){
        if(auth.user.role === "admin"){
            return <Admin/>
        }else{
            return <Home></Home>
        }
    }   return <Login/>
}

function ProtectedRouteProfile() {
    const auth = useAuth();
    return auth.user ? <Profile/> : <Login/>
}

function ProtectedRouteUserEditForm() {
    const auth = useAuth();
    return auth.user ? <EditUserForm/> : <Login/>
}

function ProtectedRouteUserDeleteForm() {
    const auth = useAuth();
    return auth.user ? <DeleteUser/> : <Login/>
}


export default Route;