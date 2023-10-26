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