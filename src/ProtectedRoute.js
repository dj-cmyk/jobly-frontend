import React, {useContext} from "react";
import UserContext from "./UserContext";
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({children, ...rest}) => {
    const user = useContext(UserContext);
    
    return user ? <Route {...rest}>{children}</Route> : <Redirect to="/login" />
}

export default ProtectedRoute;