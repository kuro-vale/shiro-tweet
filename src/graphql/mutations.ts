import {gql} from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    Auth {
      login(username: $username, password: $password) {
        token
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    Auth {
      register(username: $username, password: $password) {
        token
      }
    }
  }
`;

export const COMPOSE_MUTATION = gql`
  mutation Compose($body: String!) {
    TweetOps {
      compose(body: $body) {
        id
      }
    }
  }
`;

export const FOLLOW_MUTATION = gql`
  mutation Follow($followId: Int!) {
    UserOps {
      follow(followId: $followId)
    }
  }
`;

export const UNFOLLOW_MUTATION = gql`
  mutation Unfollow($unFollowId: Int!) {
    UserOps {
      unfollow(unFollowId: $unFollowId)
    }
  }
`;

export const HEART_MUTATION = gql`
  mutation Heart($tweetId: Int!) {
    TweetOps {
      heart(tweetId: $tweetId)
    }
  }
`;

export const UNHEART_MUTATION = gql`
  mutation UnHeart($tweetId: Int!) {
    TweetOps {
      unHeart(tweetId: $tweetId)
    }
  }
`;

export const RETWEET_MUTATION = gql`
  mutation Retweet($tweetId: Int!) {
    TweetOps {
      retweet(tweetId: $tweetId)
    }
  }
`;

export const UNRETWEET_MUTATION = gql`
  mutation UnRetweet($tweetId: Int!) {
    TweetOps {
      unRetweet(tweetId: $tweetId)
    }
  }
`;