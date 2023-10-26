import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/auth';

function AuthenticatedRoute({ children }) {
    const [auth] = useAuth();
    // console.log(auth);
    if (auth) 
        return children
    else
        return <Navigate to="/login" />
}

export default AuthenticatedRoute