/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { useAppSelector } from '../redux/hooks';

export default function AuthModal(): JSX.Element {
  const { isEdit, isSignIn, isSignUp } = useAppSelector((store) => store.user);
  let authText;
  if (isEdit) authText = 'Редактирование';
  if (isSignIn) authText = 'Войти';
  if (isSignUp) authText = 'Регистрация';

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
          height: isSignIn ? '28%' : '65%',
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
        <DialogTitle style={{ textAlign: 'center' }}>{authText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {isSignIn ? <SignInForm /> : <SignUpForm />}
          </DialogContentText>
        </DialogContent>
      </div>
    </div>
  );
}
