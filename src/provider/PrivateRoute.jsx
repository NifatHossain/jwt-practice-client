import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}) => {
    const {loading,user}= useAuth()
    const location= useLocation()
    if(loading){
        return <p className="text-center text-3xl mt-10">loading...</p>
    }
    if(user){
        return children
    }
    return <Navigate to={'/login'} state={location.pathname}></Navigate>

};

export default PrivateRoute;