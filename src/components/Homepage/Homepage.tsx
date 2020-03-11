import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CanvasJSReact from "../../assets/canvasjs.react";
import "./homepage.css";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface Props {}

interface State {}

export default class Homepage extends Component<Props, State> {
  state = {};

  render() {
    const options = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Budget - March 2020: €2,235.00",
        fontFamily: "Merriweather"
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
            { y: 670.5, label: "Savings Target" },
            { y: 340.84, label: "Transportation" },
            { y: 657.09, label: "Rent" },
            { y: 234.68, label: "Groceries" },
            { y: 93.87, label: "Clothing" },
            { y: 111.75, label: "Donations" },
            { y: 46.94, label: "Misc." },
            { y: 79.34, label: "Remaining Budget" }
          ]
        }
      ]
    };
    return (
      <Container fluid>
        <Row className="title">
          <Col>
            <h1>Manage your finances like a pro!</h1>
          </Col>
        </Row>
        <Row className="body">
          <Col className="featureList" sm>
            <h2>Features</h2>
            <p>Get informative visuals</p>
            <p>...</p>
            <p>Categorize expenses</p>
            <p>...</p>
            <p>Set savings targets</p>
            <p>...</p>
            <p>Access on all of your devices</p>
            <p>...</p>
            <p>Get bill alerts</p>
            <p>...</p>
            <p>Import bank statement</p>
            <p>...</p>
            <p>Fast, simple, and responsive</p>
          </Col>
          <Col className="diagram" sm>
            <CanvasJSChart options={options} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" size="lg">
              Sign Up Now!
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
