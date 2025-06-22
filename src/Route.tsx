import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.tsx";
import Layout from "./components/Layout.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import Login from "./components/login.tsx";
import { UserProvider } from "./components/user.provider.tsx";
import RegisterForm from "./components/Register.tsx";
import Profile from "./components/Profile.tsx";
import LogoutPage from "./components/logout.tsx";
import EditUserForm from "./components/EditUser.tsx";
import DeleteUser from "./components/DeleteUser.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import VisitTable from "./components/VisitTable.tsx";
import ReservationTable from "./components/ReservationTable.tsx";
import CreateOrganisationForm from "./components/createOrganisationForm.tsx";
import UserList from "./components/userList.tsx";
import GuideTable from "./components/guideList.tsx";
import AdminTable from "./components/adminList.tsx";
import CreateUserForm from "./components/createUserForm.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/logout",
                element: (
                    <ProtectedRoute>
                        <LogoutPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/user/edit/:id",
                element: (
                    <ProtectedRoute>
                        <UserProvider>
                            <EditUserForm />
                        </UserProvider>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/user/delete/:id",
                element: (
                    <ProtectedRoute>
                        <UserProvider>
                            <DeleteUser />
                        </UserProvider>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/visits",
                element: (
                    <ProtectedRoute>
                        <UserProvider>
                            <VisitTable />
                        </UserProvider>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/reservations",
                element: (
                    <ProtectedRoute>
                        <UserProvider>
                            <ReservationTable />
                        </UserProvider>
                    </ProtectedRoute>
                ),
            },{
                path: "/users",
                element: (
                        <UserProvider>
                            <UserList />
                        </UserProvider>
                ),
            },{
                path: "/guides",
                element: (
                        <UserProvider>
                            <GuideTable />
                        </UserProvider>
                ),
            },{
                path: "/admins",
                element: (
                        <UserProvider>
                            <AdminTable />
                        </UserProvider>
                ),
            },
            {
                path: "/organisation/create",
                element: (

                        <UserProvider>
                            <CreateOrganisationForm />
                        </UserProvider>

                ),
            },
            {
                path: "/user/create",
                element: (
                        <UserProvider>
                            <CreateUserForm />
                        </UserProvider>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <RegisterForm />,
    },
]);

function Route() {
    return <RouterProvider router={router} />;
}

export default Route;
