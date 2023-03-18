export type FormUser = {
  name: string;
  password: string;
};

export type BackendUser = {
  id: number;
  name: string;
  email: string;
  photo: string;
  dateOfBirth: Date;
  sex: string;
};

export type UsersState = {
  currUser: BackendUser | null;
  allUsers: BackendUser[];
  isSignUp: boolean;
  isSignIn: boolean;
  isEdit: boolean;
};

export type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  sex: string;
  photo: File | null;
};

export type EditInputs = {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  sex: string;
  photo: File | null;
};

export type SignInInputs = {
  email: string;
  password: string;
};