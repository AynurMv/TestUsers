import * as React from 'react';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Button, Box, Chip, TextField, InputLabel, ListItem, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../redux/hooks';
import { signInHandler, signUpHandler } from '../redux/userSice/userSlice';

type InputsType = {
  email: string;
  password: string;
};

export default function SignInForm(): JSX.Element {
  const dispatch = useAppDispatch();
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

  return (
    <form autoComplete="off" onSubmit={(e) => dispatch(signInHandler(e, inputs))}>
      <div className="form-conatainer" style={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          component="form"
          noValidate
          sx={{
            '& > :not(style)': { m: 1, width: '26ch' },
          }}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <TextField
            name="email"
            onChange={changeHandler}
            label="Ваш e-mail"
            variant="standard"
            style={{ width: '100%' }}
          />

          <TextField
            disabled={!inputs.email.includes('@') && inputs.email.length < 4}
            type="password"
            name="password"
            onChange={changeHandler}
            label="Ваш пароль"
            variant="standard"
            style={{ width: '100%' }}
          />
        </Box>
        <Button disabled={!inputs.password} type="submit" variant="contained" endIcon={<SendIcon />}>
          Войти
        </Button>
      </div>
    </form>
  );
}
