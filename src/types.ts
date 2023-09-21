import {ReactNode} from "react";

export type UserRequest = {
  Username: string,
  Password: string
}

export type AuthProviderProps = {
  children: ReactNode
}

export type AuthContextProps = {
  user: boolean,
  onLogin: (request: UserRequest) => void,
  onLogout: () => void,
  onRegister: (request: UserRequest) => void,
}

export type LoginModalProps = {
  open: boolean,
  onClose: () => void,
}