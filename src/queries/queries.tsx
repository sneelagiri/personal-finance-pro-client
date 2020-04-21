import gql from "graphql-tag";

const BUDGET_QUERY = gql`
  query BudgetQuery {
    currentBudget {
      id
      total
      startDate
      endDate
      remainingAmount
      totalExpenses
      totalSavings
      savingsTarget
      expenses {
        id
      }
      savings {
        id
      }
    }
  }
`;

export { BUDGET_QUERY };
