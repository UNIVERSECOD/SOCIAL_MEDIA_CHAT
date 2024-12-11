import { PATHS } from '@/constants/paths';
import { getCurrentUserAsync, selectUser } from '@/store/auth/authSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const { user, loading } = useSelector(selectUser);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getCurrentUserAsync());
    }, []);
  
    if (loading) return <div>Loading...</div>;
  
    if (user) {
      return <Navigate to={PATHS.HOME} />;
    }
  
  return (
   <>
   <Outlet/>
   </>
  )
}

export default AuthLayout
