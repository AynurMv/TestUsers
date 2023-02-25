import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';
import Navbar from './UI/Navbar';
import AuthModal from './UI/AuthModal';
import Account from './Account';
import NotAuth from './NotAuth';

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
        <Route index path="/account" element={<Account />} />
        <Route index path="/notauth"  element={<NotAuth />} />
      </Routes>
      {users.isSignUp && <AuthModal />}
      {users.isSignIn && <AuthModal />}
      {users.isEdit && <AuthModal />}
      {/* get it small */}
    </>
  );
}

export default App;
