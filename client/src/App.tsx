import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './UI/Navbar';
import SignUpModal from './UI/SignUpModal';

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<SignUpModal />} />
        {/* <Route index path="/account" element={<p>Hello world</p>} />
      <Route index path="/people" element={<p>Hello world</p>} /> */}
      </Routes>
    </>
  );
}

export default App;
