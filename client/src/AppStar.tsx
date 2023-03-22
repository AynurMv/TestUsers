import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './Redux/hooks';
import Navbar from './Components/Navbar';
import AuthModal from './Components/AuthModal';
import { setAllUsersAsync } from './Redux/userSice/userSlice';
import AccountPage from './Pages/AccountPage';
import AllUsersPage from './Pages/AllUsersPage';
import NotAuthPage from './Pages/NotAuthPage';

function App(): JSX.Element {
  const users = useAppSelector((store) => store.user);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={users.currUser?.id ? '/account' : '/notauth'} replace />}
        />
        <Route index path="/account" element={<AccountPage />} />
        <Route index path="/users" element={<AllUsersPage />} />
        <Route index path="/notauth" element={<NotAuthPage />} />
      </Routes>
      {(users.isSignUp || users.isSignIn || users.isEdit) && <AuthModal />}
    </>
  );
}

export default App;
