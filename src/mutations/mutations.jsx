import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        firstName
        lastName
      }
      latestBudget {
        startDate
        endDate
      }
    }
  }
`;

const BUDGET_ENTRY_MUTATION = gql`
  mutation BudgetEntryMutation(
    $total: Float!
    $startDate: DateTime!
    $endDate: DateTime!
    $savingsTarget: Float!
  ) {
    postBudget(
      total: $total
      startDate: $startDate
      endDate: $endDate
      savingsTarget: $savingsTarget
    ) {
      total
    }
  }
`;

export { SIGNUP_MUTATION, LOGIN_MUTATION, BUDGET_ENTRY_MUTATION };
