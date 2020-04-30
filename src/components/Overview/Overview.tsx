import React, { ReactElement } from "react";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import CanvasJSReact from "../../assets/canvasjs.react";
import { BUDGET_QUERY } from "../../queries/queries";
import "./overview.css";

interface Props {}

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Overview({}: Props): ReactElement {
  const { loading, error, data, refetch } = useQuery(BUDGET_QUERY);
  refetch();
  if (data) {
    const {
      startDate,
      endDate,
      expenses,
      remainingAmount,
      savings,
      savingsTarget,
      total,
      totalExpenses,
      totalSavings,
    } = data.currentBudget;
    const startDateInWords = moment(startDate).format("MMMM Do");
    const endDateInWords = moment(endDate).format("MMMM Do YYYY");
    const savingsAmount = total * (savingsTarget / 100);

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
          dataPoints: [
            { y: savingsAmount, label: "Savings Target" },
            { y: totalExpenses, label: "Expenses" },
            { y: remainingAmount - savingsAmount, label: "Remaining Budget" },
          ],
        },
      ],
    };
    return (
      <div className="overview">
        <h1 className="overview-header">Overview</h1>
        <h1 className="budget-header">Budget - Total: €{total}</h1>
        <CanvasJSChart options={options} />
      </div>
    );
  }
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
