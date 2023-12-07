import { Outlet, useNavigate } from "react-router";
import { useAuth } from "./Context/AuthContext";
import LogIn from "./Pages/Users/LogIn/LogIn";


export const ProtectedRoutes = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {

        return <LogIn />;
    }

    return <Outlet />;
};
