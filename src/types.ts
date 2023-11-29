import {ReactNode} from "react";
import {MenuProps} from "antd";

export type AuthRequest = {
  username: string,
  password: string
}

export type ParentProps = {
  children: ReactNode
}

export type AuthContextProps = {
  user: UserJWT | null,
  onLogin: (request: AuthRequest) => Promise<void>,
  onLogout: () => Promise<void>,
  onRegister: (request: AuthRequest) => Promise<void>,
}

export type ModalProps = {
  open: boolean,
  onClose: () => void,
}

export type UserJWT = {
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
  user: UserJWT | null,
}

export type MenuItem = Required<MenuProps>["items"][number];

export type TweetData = {
  TweetQueries: {
    index: Tweet[],
    tweetComments: Tweet[],
  }
}

export type TweetByIdData = {
  TweetQueries: {
    tweetById: Tweet
  }
}

export type UserQueryData = {
  UserQueries: {
    searchUsers: User[]
  }
}

export type GetUserData = {
  UserQueries: {
    userByUsername: User | null
  }
}

export type ComposeData = {
  TweetOps: {
    compose?: {
      id: number
    },
    comment?: {
      id: number
    },
  }
}

export type FollowersYouMayKnowData = {
  UserQueries: {
    followersYouMayKnow: User[]
  }
}

export type Tweet = {
  id: number,
  body: string,
  comments: number,
  createdAt: string,
  hearts: number,
  isRetweetedByYou: boolean,
  isHeartedByYou: boolean,
  retweets: number,
  parentId: number | null,
  parent?: Tweet
  author: User
}

export type User = {
  id: number,
  username: string,
  followers?: number,
  following?: number,
  hearts?: number,
  isFollowedByYou: boolean,
  isFollowingYou: boolean,
  joined?: string,
  tweets?: number,
}