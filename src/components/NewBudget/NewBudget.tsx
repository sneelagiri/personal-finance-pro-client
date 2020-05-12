import React, { ReactElement } from "react";
import { RouteComponentProps } from "react-router";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { BUDGETS_QUERY } from "../../queries/queries";
import { USER_DATA } from "../../constants";
import NewBudgetOverview from "./NewBudgetOverview";
import NewBudgetForm from "./NewBudgetForm";

interface MatchParams {
  year: string;
  month: string;
}
interface UserData {
  firstName: string;
  lastName: string;
  id: string;
}

interface Budget {
  id: string;
  startDate: string;
  endDate: string;
  postedBy: {
    id: string;
  };
  remainingAmount: number;
  savingsTarget: number;
  total: number;
  totalExpenses: number;
  totalSavings: number;
}
interface Props extends RouteComponentProps<MatchParams> {}

export default function NewBudget({ match }: Props): ReactElement {
  const userDataJSON = localStorage.getItem(USER_DATA);
  let userData: UserData = {
    firstName: "",
    lastName: "",
    id: "",
  };
  console.log(match);
  if (typeof userDataJSON === "string") {
    userData = JSON.parse(userDataJSON);
  }
  const userId = userData.id;
  const { data } = useQuery(BUDGETS_QUERY, {
    variables: { userId },
  });
  if (data && data.budget.budgets) {
    const matchingBudget = data.budget.budgets.filter((budget: Budget) => {
      const budgetDay = parseInt(moment(budget.startDate).format("DD"));
      const budgetMonth =
        budgetDay < 25
          ? moment(budget.startDate).format("MMMM").toLowerCase()
          : moment(budget.endDate).format("MMMM").toLowerCase();
      const budgetYear = moment(budget.startDate).format("YYYY");
      const selectedMonth = match.params.month;
      const selectedYear = match.params.year;
      console.log(budgetMonth, selectedMonth);
      if (budgetMonth === selectedMonth && budgetYear === selectedYear) {
        return budget;
      }
    });
    if (matchingBudget.length > 0) {
      return <NewBudgetOverview />;
    } else {
      return <NewBudgetForm />;
    }
  }
  return <h1>Loading...</h1>;
}
