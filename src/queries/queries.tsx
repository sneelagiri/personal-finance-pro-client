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

const EXPENSES_QUERY = gql`
  query ExpensesQuery {
    currentExpenses {
      id
      expenseAmount
      expenseDate
      expenseCategory
      expenseDesc
    }
  }
`;

export { BUDGET_QUERY, EXPENSES_QUERY };
