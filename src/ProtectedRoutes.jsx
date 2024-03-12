import { Outlet } from "react-router";
import { useAuth } from "./Context/AuthContext";
import LogIn from "./Pages/Users/LogIn/LogIn";
import { useFetchUserInformation } from "./Hooks/useFetch";
import Cookies from 'js-cookie';
import { LoadingPage } from "./Pages/PagesAdicional/Loading";


export const ProtectedRoutes = () => {
    const { isLoading, isLoggedIn } = useAuth();
    const token = Cookies.get('token');

    const { data: userData, get: getUser, loading: loadingUser } = useFetchUserInformation(token);

    if (loadingUser) {
        return <LoadingPage />;
    }

    if (!isLoggedIn) {
        return <LogIn />;
    }

    return <Outlet />;
};