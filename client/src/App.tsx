import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AuthModal from './Components/AuthModal';
import AccountPage from './Pages/AccountPage';
import AllUsersPage from './Pages/AllUsersPage';
import NotAuthPage from './Pages/NotAuthPage';
import PrivateRoute from './Components/HOC/PrivateRoute';

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/account" replace />} />
        <Route element={<PrivateRoute />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/users" element={<AllUsersPage />} />
        </Route>
        <Route path="/notauth" element={<NotAuthPage />} />
      </Routes>
      <AuthModal />
    </>
  );
}

export default App;
