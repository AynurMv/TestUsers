import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks';

// type ProtectedRouteProps = {
//   children: JSX.Element;
// };

export default function ProtectedRoute(): JSX.Element {
  const currentUser = useAppSelector((store) => store.user.currUser);
  if (!currentUser) {
    return <Navigate to='/notauth' replace />;
  }
  return <Outlet />;
};
