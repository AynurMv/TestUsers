import * as React from 'react';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Button, Box, Chip, TextField, InputLabel, ListItem, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { signUpHandler, editHandler } from '../../Redux/userSice/userSlice';

type InputsType = {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  sex: string;
  photo: null | File;
};

export default function SignUpForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<InputsType>(
    users.currUser?.name
      ? {
          name: users?.currUser.name,
          email: users?.currUser.email,
          password: '',
          dateOfBirth: moment(users?.currUser.dateOfBirth).format('YYYY-MM-DD'),
          sex: users?.currUser.sex,
          photo: null,
        }
      : {
          name: '',
          email: '',
          password: '',
          dateOfBirth: '',
          sex: '',
          photo: null,
        },
  );

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void =>
    users.isEdit
      ? dispatch(editHandler(e, inputs, navigate))
      : dispatch(signUpHandler(e, inputs, navigate));

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
        name="name"
        onChange={changeHandler}
        label="Ваше имя"
        variant="standard"
        style={textFieldStyle}
        value={inputs.name}
      />
      <TextField
        disabled={inputs.name.length < 1}
        name="email"
        onChange={changeHandler}
        label="Ваш e-mail"
        variant="standard"
        style={textFieldStyle}
        value={inputs.email}
      />

      {!users.isEdit && (
        <TextField
          disabled={!inputs.email.includes('@') && inputs.email.length < 4}
          type="password"
          name="password"
          onChange={changeHandler}
          label="Ваш пароль"
          variant="standard"
          style={textFieldStyle}
        />
      )}

      <TextField
        disabled={users.isEdit ? false : inputs.password.length < 6}
        id="date"
        label="Дата рождения"
        type="date"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        value={inputs.dateOfBirth}
        name="dateOfBirth"
        onChange={changeHandler}
      />
      <InputLabel id="demo-simple-select-label">Ваш пол</InputLabel>

      <Select
        disabled={users.isEdit ? false : inputs.password.length < 6}
        sx={{ maxWidth: 200 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="sex"
        value={inputs.sex}
        onChange={(e) => {
          handleChange(e);
        }}
      >
        <MenuItem value="мужской">Мужской</MenuItem>
        <MenuItem value="женский">Женский</MenuItem>
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
      <Button disabled={!inputs.sex} variant="contained" component="label">
        Загрузите фото
        <input name="photo" type="file" id="file" hidden onChange={addPhotoHandler} />
      </Button>

      <Button
        disabled={users.isEdit ? false : !inputs.photo}
        sx={{ marginTop: 2 }}
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
      >
        Отправить
      </Button>
    </Box>
  );
}
