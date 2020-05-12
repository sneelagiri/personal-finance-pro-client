import React, { ReactElement, useState, ChangeEvent } from "react";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { useHistory } from "react-router-dom";

import CanvasJSReact from "../../assets/canvasjs.react";
import { BUDGET_QUERY, EXPENSES_QUERY } from "../../queries/queries";

import "./overview.css";

interface Props {}

interface Expense {
  id: string;
  expenseAmount: number;
  expenseDate: string;
  expenseDesc: string;
  expenseCategory: string;
}

interface DataPoints {
  y: number;
  label: string;
}

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Overview({}: Props): ReactElement {
  const currentMonth = moment().format("MMMM");
  const currentYear = moment().format("YYYY");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const history = useHistory();
  let finalSavings = 0;
  let finalRemainingAmount = 0;
  const { loading, error, data, refetch } = useQuery(BUDGET_QUERY);
  const {
    loading: loadingExpenses,
    data: expensesData,
    error: expensesError,
    refetch: refetchExpenses,
  } = useQuery(EXPENSES_QUERY);
  refetch();
  if (data && expensesData) {
    const {
      startDate,
      endDate,
      remainingAmount,
      savingsTarget,
      total,
      totalExpenses,
    } = data.currentBudget;
    const startDateInWords = moment(startDate).format("MMMM Do");
    const endDateInWords = moment(endDate).format("MMMM Do YYYY");
    const savingsAmount = total * (savingsTarget / 100);
    let categoryTotals = {
      housing: 0,
      utilities: 0,
      transportation: 0,
      groceries: 0,
      entertainment: 0,
      educational: 0,
      health: 0,
      loan: 0,
      donations: 0,
      misc: 0,
    };
    expensesData.currentExpenses.forEach((expense: Expense) => {
      switch (expense.expenseCategory) {
        case "Rent/Mortgage": {
          categoryTotals.housing =
            categoryTotals.housing + expense.expenseAmount;
          break;
        }
        case "Utilities": {
          categoryTotals.utilities =
            categoryTotals.utilities + expense.expenseAmount;
          break;
        }
        case "Transportation": {
          categoryTotals.transportation =
            categoryTotals.transportation + expense.expenseAmount;
          break;
        }
        case "Groceries": {
          categoryTotals.groceries =
            categoryTotals.groceries + expense.expenseAmount;
        }
        case "Entertainment": {
          categoryTotals.entertainment =
            categoryTotals.entertainment + expense.expenseAmount;
          break;
        }
        case "Educational": {
          categoryTotals.educational =
            categoryTotals.educational + expense.expenseAmount;
          break;
        }
        case "Health": {
          categoryTotals.health = categoryTotals.health + expense.expenseAmount;
          break;
        }
        case "Loan": {
          categoryTotals.loan = categoryTotals.loan + expense.expenseAmount;
          break;
        }
        case "Donations": {
          categoryTotals.donations =
            categoryTotals.donations + expense.expenseAmount;
          break;
        }
        case "Misc.": {
          categoryTotals.misc = categoryTotals.misc + expense.expenseAmount;
          break;
        }
        default: {
          break;
        }
      }
    });
    let dataPoints: DataPoints[] = [];
    const dataPointsGenerator = () => {
      if (categoryTotals.housing > 0) {
        const newEntry: DataPoints = {
          y: categoryTotals.housing,
          label: "Rent/Mortgage",
        };
        dataPoints = [...dataPoints, newEntry];
      }
      if (categoryTotals.utilities > 0) {
        const newEntry: DataPoints = {
          y: categoryTotals.utilities,
          label: "Utilities",
        };
        dataPoints = [...dataPoints, newEntry];
      }
      if (categoryTotals.transportation > 0) {
        const newEntry: DataPoints = {
          y: categoryTotals.transportation,
          label: "Transportation",
        };
        dataPoints = [...dataPoints, newEntry];
      }
      if (categoryTotals.groceries > 0) {
        const newEntry: DataPoints = {
          y: categoryTotals.groceries,
          label: "Groceries",
        };
        dataPoints = [...dataPoints, newEntry];
      }
      if (categoryTotals.entertainment > 0) {
        const newEntry: DataPoints = {
          y: categoryTotals.entertainment,
          label: "Entertainment/Leisure",
        };
        dataPoints = [...dataPoints, newEntry];
      }
      if (categoryTotals.educational > 0) {
        const newEntry: DataPoints = {
          y: categoryTotals.educational,
          label: "Educational",
        };
        dataPoints = [...dataPoints, newEntry];
      }
      if (categoryTotals.health > 0) {
        const newEntry: DataPoints = {
          y: categoryTotals.health,
          label: "Health",
        };
        dataPoints = [...dataPoints, newEntry];
      }
      if (categoryTotals.loan > 0) {
        const newEntry: DataPoints = {
          y: categoryTotals.loan,
          label: "Loan",
        };
        dataPoints = [...dataPoints, newEntry];
      }
      if (categoryTotals.donations > 0) {
        const newEntry: DataPoints = {
          y: categoryTotals.donations,
          label: "Donations",
        };
        dataPoints = [...dataPoints, newEntry];
      }
      if (categoryTotals.misc > 0) {
        const newEntry: DataPoints = {
          y: categoryTotals.misc,
          label: "Misc.",
        };
        dataPoints = [...dataPoints, newEntry];
      }
      const isBudgetNegative = total - savingsAmount - totalExpenses;
      if (isBudgetNegative < 0) {
        const remainingSavings = savingsAmount + isBudgetNegative;
        const newEntry: DataPoints = {
          y: remainingSavings,
          label: "Remaining Savings",
        };
        finalSavings = remainingSavings;
        dataPoints = [...dataPoints, newEntry];
      } else {
        const newEntry: DataPoints = {
          y: savingsAmount,
          label: "Savings",
        };
        const remainingAmount: DataPoints = {
          y: isBudgetNegative,
          label: "Remaining Amount",
        };
        finalSavings = savingsAmount;
        finalRemainingAmount = isBudgetNegative;
        dataPoints = [...dataPoints, newEntry, remainingAmount];
      }
    };
    dataPointsGenerator();
    const options = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: `${startDateInWords} - ${endDateInWords}`,
        fontFamily: "Montserrat Alternates",
        fontSize: 24,
        fontColor: "black",
      },
      backgroundColor: "rgb(248, 251, 251)",
      data: [
        {
          type: "pie",
          // showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - #percent%",
          percentFormatString: "#0.##",
          yValueFormatString: "€#,###.00",
          indexLabelFontFamily: "Raleway",
          toolTipContent: "{y} (#percent%)",
          dataPoints: dataPoints,
        },
      ],
    };
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const years = [
      moment().subtract("1", "years").format("YYYY"),
      moment().format("YYYY"),
      moment().add("1", "years").format("YYYY"),
    ];
    console.log(selectedMonth);
    return (
      <div className="overview">
        <h1 className="overview-header">Overview</h1>
        <div className="month-select">
          <form>
            <select
              defaultValue={selectedMonth}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                setSelectedMonth(event.target.value);
              }}
            >
              {months.map((month) => {
                if (month === moment().format("MMMM")) {
                  return (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  );
                }
                return (
                  <option key={month} value={month}>
                    {month}
                  </option>
                );
              })}
            </select>
            <select
              defaultValue={years[1]}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                setSelectedYear(event.target.value);
              }}
            >
              <option key={years[0]} value={years[0]}>
                {years[0]}
              </option>
              <option key={years[1]} value={years[1]} selected>
                {years[1]}
              </option>
              <option key={years[2]} value={years[2]}>
                {years[2]}
              </option>
            </select>
            <button
              onClick={() => {
                history.push(
                  `/overview/${selectedYear}/${selectedMonth.toLowerCase()}`
                );
              }}
            >
              Go
            </button>
          </form>
        </div>
        <h1 className="budget-header">
          Budget - Remaining Amount: €{finalRemainingAmount}
        </h1>
        <CanvasJSChart options={options} />
        {finalRemainingAmount === 0 ? (
          <p className="red">
            Warning! You have depleted your budget and you are tapping into your
            savings.
          </p>
        ) : null}
        <p>Total Budget: €{total}</p>
        <p>Total Expenses: €{totalExpenses}</p>
        <p>Remaining Savings: €{finalSavings}</p>
        <p>Remaining Budget: €{finalRemainingAmount}</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
