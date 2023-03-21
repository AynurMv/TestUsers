/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';
import './style.css';
import { setIsEdit, setIsSignIn, setIsSignUp } from '../../Redux/userSice/userSlice';

export default function AuthModal(): JSX.Element {
  const { isEdit, isSignIn, isSignUp } = useAppSelector((store) => store.user);
  let authText = null;
  if (isEdit) authText = 'Редактирование';
  if (isSignIn) authText = 'Войти';
  if (isSignUp) authText = 'Регистрация';
  const dispatch = useAppDispatch();
  return (
    <div
      className="modalBox"
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setIsSignUp(false));
        dispatch(setIsSignIn(false));
        dispatch(setIsEdit(false));
      }}
    >
      <div
        className="modalwindow"
        style={{ height: isSignIn ? '28%' : '55%' }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DialogTitle style={{ textAlign: 'center' }}>{authText}</DialogTitle>
        <div style={{display: 'flex', justifyContent: 'center'}}>{isSignIn ? <SignInForm /> : <SignUpForm />}</div>
      </div>
    </div>
  );
}
