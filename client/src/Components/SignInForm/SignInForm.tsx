import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { signInHandler } from '../../Redux/userSice/userSlice';

type InputsType = {
  email: string;
  password: string;
};

export default function SignInForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<InputsType>({
    email: '',
    password: '',
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(signInHandler(e, inputs, navigate));
  };

  const textFieldStyle = { width: '100%', marginBottom: '1rem' };
  const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    justifyContent: 'center',
  };

  return (
    <Box component="form" onSubmit={submitHandler} autoComplete="off" sx={boxStyle}>
      <TextField
        name="email"
        onChange={changeHandler}
        label="Ваш e-mail"
        variant="standard"
        style={textFieldStyle}
      />
      <TextField
        disabled={!inputs.email.includes('@') && inputs.email.length < 4}
        type="password"
        name="password"
        onChange={changeHandler}
        label="Ваш пароль"
        variant="standard"
        style={textFieldStyle}
      />
      <Button disabled={!inputs.password} type="submit" variant="contained" endIcon={<SendIcon />}>
        Войти
      </Button>
    </Box>
  );
}
