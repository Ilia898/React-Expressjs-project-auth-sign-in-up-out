// User registration and login

export interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: number;
  reEnterPassword: number;
}

export interface LoginInput {
  email: string;
  password: number;
}

export interface UserRegistered {
  firstName: string;
  email: string;
  iat: number;
  name: string;
}

export interface UserChildrenType {
  children: React.ReactNode;
}

export interface UserContextType {
  user: UserRegistered | null;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  logout: () => void;
  authStatus: boolean;
  setAuthStatus: React.Dispatch<React.SetStateAction<boolean>>;
}
