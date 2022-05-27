import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../helpers/auth'

const AdminRoute = ({ children }) => {
    const auth = isAuthenticated();

    return auth && auth.role === 1 ? children : <Navigate to='/signin' />
}

export default AdminRoute;

