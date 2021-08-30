import { gql } from "@apollo/client";

export const getUsers = gql`
  query getUsers {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;