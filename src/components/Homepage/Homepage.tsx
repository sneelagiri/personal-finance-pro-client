import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CanvasJSReact from "../../assets/canvasjs.react";
import { options } from "./chartConfigs";
import { AUTH_TOKEN } from "../../constants";
import "./homepage.css";

interface Props {}

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Homepage extends Component<Props> {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="homepage">
        <Container fluid>
          <Row className="title">
            <Col>
              <h1 className="title">Manage your finances like a pro!</h1>
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
              {/* <p>Get bill alerts</p>
              <p>...</p>
              <p>Import bank statement</p>
              <p>...</p> */}
              <p>Fast, simple, and responsive</p>
            </Col>
            <Col className="diagram" sm>
              <CanvasJSChart options={options} />
            </Col>
          </Row>
          <Row>
            <Col>
              {authToken == null ? (
                <Link to="/signup">
                  <Button variant="primary" size="lg">
                    Sign Up Now!
                  </Button>
                </Link>
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
