import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const PrivateRoutes = ({children}) => {

    //! get function from UserContext.js
    const {user, loading} = useContext(AuthContext);

    //! use useLocation for get current location page
    const location = useLocation(); 

     //! if loading function run show msg
    if(loading){
        return <div className='loading-text'>Loading...</div>
    }

   //! if user and user uid have then show children (shipping page)
   if(user && user.uid){
    return children;
   }

   //! if user and user uid not have then show login page 
   //!(NOTE: state={{ from: location }} replace => use for record the current location page and when login stay that page)
   return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoutes;