import auth from "../../../auth_service";
import {Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type PrivateRouteProps = {
  children: React.ReactNode;
}

const PrivateRoute : React.FC<PrivateRouteProps>= ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); //empty boolean value
    const location = useLocation();


      useEffect(() => {
        auth.isUser().then(setIsAuthenticated);  //if auth isUser set Authenticated to true
    }, []);

   
      if (!isAuthenticated) {
     return <Navigate to="/loginPage" state={{ from: location }} />;
    }

    return (
        children
    )

}

export default PrivateRoute;