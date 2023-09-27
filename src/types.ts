import {ReactNode} from "react";

export type UserRequest = {
  Username: string,
  Password: string
}

export type AuthProviderProps = {
  children: ReactNode
}

export type AuthContextProps = {
  user: User | null,
  onLogin: (request: UserRequest) => Promise<void>,
  onLogout: () => Promise<void>,
  onRegister: (request: UserRequest) => Promise<void>,
}

export type LoginModalProps = {
  open: boolean,
  onClose: () => void,
}

export type User = {
  id: number,
  sub: string,
}

export type AuthData = {
  Auth: {
    login: AuthPayload,
    register: AuthPayload,
  },
}

export type AuthPayload = {
  token: string,
  user: User | null,
}