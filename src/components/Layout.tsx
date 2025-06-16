import {Outlet} from "react-router-dom";
import Nav from "./Nav.tsx";
import {UserProvider} from "./user.provider.tsx";

function Layout() {
    return (
        <div className={"w-screen h-screen flex overflow-hidden"}>
            <UserProvider>
            <Nav/>
            </UserProvider>
            <div className={"flex w-5/6 flex-col p-5 "}>
                <Outlet/>
            </div>


        </div>

    )
}

export default Layout;