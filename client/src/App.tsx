import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import Navbar from './UI/Navbar';
import AuthModal from './UI/AuthModal';
import Account from './Account';
import NotAuth from './NotAuth';
import { setAllUsersAsync } from './redux/userSice/userSlice';
import Users from './Users';

function App(): JSX.Element {
  const users = useAppSelector((store) => store.user);
  console.log(users);
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setAllUsersAsync())
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={users.currUser?.id ? '/account' : '/notauth'} replace />}
        />
        <Route index path="/account" element={<Account />} />
        <Route index path="/users" element={<Users />} />
        <Route index path="/notauth" element={<NotAuth />} />
      </Routes>
      {(users.isSignUp || users.isSignIn || users.isEdit) && <AuthModal />}
      {/* {users.isSignIn && <AuthModal />}
      {users.isEdit && <AuthModal />} */}
      {/* get it small */}
    </>
  );
}

export default App;
