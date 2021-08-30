import { gql } from "@apollo/client";


export const getDonations = gql`
  query getDonations {
    donations {
      id
      userId
      amount
      tip
    }
  }
`;

export const getDonationByUserId = (userId: string) => gql`
  query Query {
    getDonationByUserId(userId: "${userId}") {
      id
      tip
      amount
    }
}`

export const updateDonation = gql`
    mutation UpdateDonationsMutation($id: String, $amount: Float,$tip: Float) {
     updateDonations(id: $id, amount: $amount,tip:$tip) {
        id
        amount
        tip
      }
    }
`;

export const createDonations = gql`
  mutation Mutation($userId: String, $amount: Float, $tip: Float) {
    createDonations(userId: $userId, amount: $amount, tip: $tip){
        id
        amount
        tip
    }
  }
`;
export const removeDonations = gql`
  mutation RemoveDonationsMutation($id: String) {
    removeDonations(id: $id)
  }
`;