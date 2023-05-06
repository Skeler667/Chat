import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.hook";


const PrivateRoute = () => {
const { token } = useAuth()
console.log(token)
return token ? <Outlet/> : <Navigate to='/login'/>;
}
export default PrivateRoute;