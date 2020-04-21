import React, { ReactElement } from "react";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import CanvasJSReact from "../../assets/canvasjs.react";
import { BUDGET_QUERY } from "../../queries/queries";

interface Props {}

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default function Overview({}: Props): ReactElement {
  const { loading, error, data } = useQuery(BUDGET_QUERY);
  if (data) {
    console.log(data);
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
        fontFamily: "Merriweather",
      },

      data: [
        {
          type: "pie",
          // showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - #percent%",
          percentFormatString: "#0.##",
          yValueFormatString: "€#,###.00",
          indexLabelFontFamily: "Caladea",
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
      <div>
        <h1>Overview</h1>
        <h1>Budget - Total: €{total}</h1>
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
