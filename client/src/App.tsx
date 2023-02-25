import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';
import Navbar from './UI/Navbar';
import AuthModal from './UI/AuthModal';

function App(): JSX.Element {
  const users = useAppSelector((store) => store.user);
  console.log(users);

  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<p>Hello world</p>} />
        {/* <Route index path="/account" element={<p>Hello world</p>} />
      <Route index path="/people" element={<p>Hello world</p>} /> */}
      </Routes>
      {users.isSignUp && <AuthModal isSignIn={false} />}
      {users.isSignIn && <AuthModal isSignIn />}
    </>
  );
}

export default App;
