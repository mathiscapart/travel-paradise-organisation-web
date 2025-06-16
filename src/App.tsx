import Route from "./Route.tsx";
import './App.css'
import { UserProvider } from './components/user.provider.tsx';


function App() {

    return (
        <>
            <UserProvider>
                <Route/>
            </UserProvider>
        </>
    )
}

export default App
