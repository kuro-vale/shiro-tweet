import {gql} from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
      Auth {
          login(username: $username, password: $password) {
              token
          }
      }
  }
`