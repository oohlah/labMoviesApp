import auth from "../../../auth_service";
import {Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    if(!auth.isUser) return (<Navigate to={'/loginPage'}/>)
    return (
        children
    )

}

export default PrivateRoute;