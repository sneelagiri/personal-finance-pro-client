import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./homepage.css";
interface Props {}
interface State {}

export default class Homepage extends Component<Props, State> {
  state = {};

  render() {
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
          <Col></Col>
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
