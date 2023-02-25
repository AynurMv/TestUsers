import { ClockNumberProps } from '@mui/x-date-pickers';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AppThunk } from '../hooks';
import type { RootState } from '../store';
// import type { FormUser } from './userTypes';

type BackendUser = {
  id: number;
  name: string;
  email: string;
  photo: string;
  dateOfBirth: string;
  sex: string;
};

type UsersState = {
  currUser: BackendUser | null;
  allUsers: BackendUser[];
};

export type FormUser = {
  name: string;
  password: string;
};

// Define the initial state using that type
const initialState: UsersState = {
  currUser: null,
  allUsers: [],
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<BackendUser>) => ({
      currUser: action.payload,
      allUsers: [...state.allUsers, action.payload],
    }),
    logoutUser: (state, action: PayloadAction<BackendUser['id']>) => ({
      currUser: null,
      allUsers: state.allUsers.filter((user) => user.id !== action.payload),
    }),
    setAllUsers: (state, action: PayloadAction<BackendUser[]>) => ({
      ...state,
      allUsers: action.payload,
    }),
  },
});

export const { setUser, logoutUser, setAllUsers } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootState): UserState => state.user;

export const signInHandler =
  (e: React.FormEvent<HTMLFormElement>, formInput: FormUser): AppThunk =>
  (dispatch) => {
    axios
      .post<BackendUser>('/auth', formInput)
      .then((res) => dispatch(setUser({ ...res.data })))
      .catch((err) => {
        console.log(err);
      });
  };

type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  sex: string;
  photo: File | null;
};

export const signUpHandler =
  (e: React.FormEvent<HTMLFormElement>, formInput: SignUpInputs): AppThunk =>
  (dispatch) => {
    e.preventDefault();
    if (formInput.photo) {
      const data = new FormData();
      data.append('name', formInput.name);
      data.append('password', formInput.password);
      data.append('email', formInput.email);
      data.append('photo', formInput.photo);
      data.append('dateOfBirth', formInput.dateOfBirth);
      data.append('sex', formInput.sex);
      fetch('http://localhost:3001/api/user/signup', {
        method: 'POST',
        body: data,
      })
        .then((resp) => resp.json())
        .then((resp: BackendUser) => {
          console.log(resp);
          dispatch(setUser(resp));
        })
        .catch(console.log);
      // axios
      //   .post<BackendUser>('/auth', formInput)
      //   .then((res) => dispatch(setUser({ ...res.data })))
      //   .catch((err) => {
      //     console.log(err);
      //   });
    } else {
      console.log('No photo');
    }
  };

export const logoutHandler = (userId: number): AppThunk => (dispatch) => {
  axios('/auth/logout')
    .then(() => dispatch(logoutUser(userId)))
    .catch(console.log);
};

export const checkAuth = (): AppThunk => (dispatch) => {
  axios<BackendUser>('/auth/check')
    .then((res) => dispatch(setUser({ ...res.data })))
    .catch(console.log);
};

export const setAllUsersAsync = (): AppThunk => (dispatch) => {
  axios<BackendUser[]>('/users')
    .then((res) => dispatch(setAllUsers(res.data)))
    .catch(console.log);
};

export default userSlice.reducer;
