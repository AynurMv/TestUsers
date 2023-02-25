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
  isSignUp: boolean;
  isSignIn: boolean;
};

// Define the initial state using that type
const initialState: UsersState = {
  currUser: null,
  allUsers: [],
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
      allUsers: [...state.allUsers, action.payload],
    }),
    logoutUser: (state, action: PayloadAction<BackendUser['id']>) => ({
      ...state,
      currUser: null,
      allUsers: state.allUsers.filter((user) => user.id !== action.payload),
    }),
    setAllUsers: (state, action: PayloadAction<BackendUser[]>) => ({
      ...state,
      allUsers: action.payload,
    }),
    setSignUp: (state, action: PayloadAction<UsersState['isSignUp']>) => ({
      ...state,
      isSignUp: action.payload,
    }),
    setSignIn: (state, action: PayloadAction<UsersState['isSignIn']>) => ({
      ...state,
      isSignIn: action.payload,
    }),
  },
});

export const { setUser, logoutUser, setAllUsers, setSignUp, setSignIn } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootState): UserState => state.user;

// type FormUser = {
//   name: string;
//   password: string;
// };

// export const signInHandler =
//   (e: React.FormEvent<HTMLFormElement>, formInput: FormUser): AppThunk =>
//   (dispatch) => {
//     axios
//       .post<BackendUser>('/auth', formInput)
//       .then((res) => dispatch(setUser({ ...res.data })))
//       .catch((err) => {
//         console.log(err);
//       });
//   };

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
          dispatch(setSignUp(false));
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

  type SignInInputs = {
    email: string;
    password: string;
  };

  export const signInHandler =
  (e: React.FormEvent<HTMLFormElement>, formInput: SignInInputs): AppThunk =>
  (dispatch) => {
    e.preventDefault();
      axios
        .post<BackendUser>('/api/user/signin', formInput)
        .then((res) => {
          dispatch(setUser({ ...res.data }))
          dispatch(setSignIn(false));
        })
        .catch(console.log);
  };

export const logoutHandler =
  (userId: number): AppThunk =>
  (dispatch) => {
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
