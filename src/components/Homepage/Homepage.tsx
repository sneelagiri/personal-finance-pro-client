import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./homepage.css";
import CanvasJSReact from "../../assets/canvasjs.react";
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
        text: "Budget - March 2020: €2,235.00"
      },
      data: [
        {
          type: "pie",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - #percent%",
          percentFormatString: "#0.##",
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
        <Row>
          <Col>
            <h1>Manage your finances like a pro!</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Features</h2>
            <ul>
              <li>Get informative visuals</li>
              <li>Categorize expenses</li>
              <li>Set savings targets</li>
              <li>Access on all of your devices</li>
              <li>Get bill alerts</li>
              {/* <li>Import bank statement</li> */}
              <li>Fast, simple, and responsive</li>
            </ul>
          </Col>
          <Col>
            <CanvasJSChart options={options} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success">Sign Up Now!</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
