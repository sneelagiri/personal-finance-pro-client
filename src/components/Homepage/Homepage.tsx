import React, { ReactElement } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CanvasJSReact from "../../assets/canvasjs.react";
import { options } from "./chartConfigs";
import "./homepage.css";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface Props {}

export default function Homepage({}: Props): ReactElement {
  return (
    <div>
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
    </div>
  );
}
