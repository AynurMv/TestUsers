/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

type ModalRegistrationProps = { isSignIn: boolean };

export default function AuthModal({ isSignIn }: ModalRegistrationProps): JSX.Element {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        backgroundColor: '#0000006e',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '100',
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="modalwindow"
        style={{
          width: '40%',
          height: '65%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '10%',
          border: '3px solid rgba(0, 0, 0, 0.05)',
          borderRadius: '10px',
          backgroundColor: 'white',
          opacity: '1',
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DialogTitle style={{ textAlign: 'center' }}>Регистрация</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {isSignIn ?  <SignInForm /> : <SignUpForm />}
          </DialogContentText>
        </DialogContent>
      </div>
    </div>
  );
}
