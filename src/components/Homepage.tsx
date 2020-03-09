import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Props {}
interface State {}

export default class Homepage extends Component<Props, State> {
  state = {};

  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}
