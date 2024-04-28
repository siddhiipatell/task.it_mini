import React from 'react';
import Navbar from '../Navbar'

const UserPrivateRoute = ({component:Component}) => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.replace('/login');
    }
  return (
    <div>
        <Navbar />
        <Component />
    </div>
  );
}

export default UserPrivateRoute;