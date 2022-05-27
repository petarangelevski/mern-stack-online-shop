import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../helpers/auth'

const UserRoute = ({ children }) => {
    const auth = isAuthenticated();

    return auth && auth.role === 0 ? children : <Navigate to='/signin' />
}

export default UserRoute;