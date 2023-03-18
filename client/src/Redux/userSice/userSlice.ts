import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { NavigateFunction } from 'react-router-dom';
import type { AppThunk } from '../hooks';
import type { BackendUser, EditInputs, SignInInputs, SignUpInputs, UsersState } from './userTypes';

// Define the initial state using that type
const initialState: UsersState = {
  currUser: null,
  allUsers: [],
  isEdit: false,
  isSignUp: false,
  isSignIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<BackendUser>) => ({
      ...state,
      currUser: action.payload,
      allUsers: [...state.allUsers.filter((user) => user.id !== action.payload.id), action.payload],
    }),
    editUser: (state, action: PayloadAction<BackendUser>) => ({
      ...state,
      currUser: action.payload,
      allUsers: state.allUsers.map((user) => {
        if (user.id === action.payload.id) return action.payload;
        return user;
      }),
    }),
    logoutUser: (state) => ({
      ...state,
      allUsers: state.allUsers.filter((user) => user.id !== state.currUser?.id),
      currUser: null,
    }),
    setAllUsers: (state, action: PayloadAction<BackendUser[]>) => ({
      ...state,
      allUsers: action.payload,
    }),
    setIsSignUp: (state, action: PayloadAction<UsersState['isSignUp']>) => ({
      ...state,
      isSignUp: action.payload,
    }),
    setIsSignIn: (state, action: PayloadAction<UsersState['isSignIn']>) => ({
      ...state,
      isSignIn: action.payload,
    }),
    setIsEdit: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isEdit: action.payload,
    }),
  },
});

export const { setUser, logoutUser, setAllUsers, setIsSignUp, setIsSignIn, setIsEdit, editUser } =
  userSlice.actions;

export const signUpHandler =
  (
    e: React.FormEvent<HTMLFormElement>,
    formInput: SignUpInputs,
    navigate: NavigateFunction,
  ): AppThunk =>
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
          dispatch(setUser(resp));
          dispatch(setIsSignUp(false));
          navigate('/account');
        })
        .catch(console.log);
    } else {
      console.log('No photo');
    }
  };

export const editHandler =
  (
    e: React.FormEvent<HTMLFormElement>,
    formInput: EditInputs,
    navigate: NavigateFunction,
  ): AppThunk =>
  (dispatch) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formInput.name);
    data.append('password', formInput.password);
    data.append('email', formInput.email);
    if (formInput.photo) data.append('photo', formInput.photo);
    data.append('dateOfBirth', formInput.dateOfBirth);
    data.append('sex', formInput.sex);
    fetch('http://localhost:3001/api/user', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    })
      .then((resp) => resp.json())
      .then((resp: BackendUser) => {
        dispatch(editUser(resp));
        dispatch(setIsEdit(false));
        navigate('/account');
      })
      .catch(console.log);
  };

export const signInHandler =
  (
    e: React.FormEvent<HTMLFormElement>,
    formInput: SignInInputs,
    navigate: NavigateFunction,
  ): AppThunk =>
  (dispatch) => {
    e.preventDefault();
    axios
      .post<BackendUser>('/api/user/signin', formInput)
      .then((res) => {
        dispatch(setUser({ ...res.data }));
        dispatch(setIsSignIn(false));
        navigate('/account');
      })
      .catch(console.log);
  };

export const setAllUsersAsync = (): AppThunk => (dispatch) => {
  axios<BackendUser[]>('/api/user')
    .then((res) => dispatch(setAllUsers(res.data)))
    .catch(console.log);
};

export default userSlice.reducer;
