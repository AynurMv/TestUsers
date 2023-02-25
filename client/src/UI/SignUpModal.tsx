import * as React from 'react';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Button, Box, Chip, TextField, InputLabel, ListItem, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../redux/hooks';
import { signUpHandler } from '../redux/userSice/userSlice';

type InputsType = {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  sex: string;
  photo: null | File;
};

export default function SignUpModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState<InputsType>({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    sex: '',
    photo: null,
  });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange = (e: SelectChangeEvent): void => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addPhotoHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget.files) {
      const { files } = e.currentTarget;
      setInputs((prev) => ({
        ...prev,
        [e.target.name]: files[0],
      }));
    }
  };
  return (
    <form autoComplete="off" onSubmit={(e) => dispatch(signUpHandler(e, inputs))}>
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
            name="name"
            onChange={changeHandler}
            label="Ваше имя"
            variant="standard"
            style={{ width: '100%' }}
          />
          <TextField
            disabled={inputs.name.length < 1}
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

          <TextField
            disabled={inputs.password.length < 6}
            id="date"
            label="Дата рождения"
            type="date"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            name="dateOfBirth"
            onChange={changeHandler}
          />
          <InputLabel id="demo-simple-select-label">Ваш пол</InputLabel>
          <Select
            disabled={inputs.password.length < 6}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="sex"
            // label="Ваш пол"
            value={inputs.sex}
            // defaultValue=""
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <MenuItem value="M">М</MenuItem>
            <MenuItem value="F">Ж</MenuItem>
          </Select>

          <ListItem style={{ marginTop: '1px', overflow: 'hidden', width: '100%' }}>
            {inputs.photo && (
              <Chip
                label={inputs.photo.name}
                variant="outlined"
                style={{ marginRight: '5px' }}
                key={uuidv4()}
              />
            )}
          </ListItem>
          <Button variant="contained" component="label">
            Загрузите фото
            <input name="photo" type="file" id="file" hidden onChange={addPhotoHandler} />
          </Button>
        </Box>
        <Button disabled={!inputs.photo} type="submit" variant="contained" endIcon={<SendIcon />}>
          Отправить
        </Button>
      </div>
    </form>
  );
}
