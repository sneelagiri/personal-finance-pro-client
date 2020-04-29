const options = {
  exportEnabled: true,
  animationEnabled: true,
  title: {
    text: "Budget - April 2020: €2,235.00",
    fontFamily: "Montserrat Alternates",
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
        { y: 670.5, label: "Savings Target" },
        { y: 340.84, label: "Transportation" },
        { y: 657.09, label: "Rent" },
        { y: 234.68, label: "Groceries" },
        { y: 93.87, label: "Clothing" },
        { y: 111.75, label: "Donations" },
        { y: 46.94, label: "Misc." },
        { y: 79.34, label: "Remaining Budget" },
      ],
    },
  ],
};

module.exports = { options };
