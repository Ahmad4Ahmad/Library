import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./useUser";

const PrivateRoute = ({ element: Element, ...rest }) =>
{
    const user = useUser();
    if (!user)
    {
        return <Navigate to="/signin" />;
    }

    return <Outlet></Outlet>;
};

export default PrivateRoute;