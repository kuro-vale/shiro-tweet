import {ReactNode} from "react";

export type AuthRequest = {
  username: string,
  password: string
}

export type AuthProviderProps = {
  children: ReactNode
}

export type AuthContextProps = {
  user: User | null,
  onLogin: (request: AuthRequest) => Promise<void>,
  onLogout: () => Promise<void>,
  onRegister: (request: AuthRequest) => Promise<void>,
}

export type ModalProps = {
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