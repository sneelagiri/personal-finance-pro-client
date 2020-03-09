import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
// import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
import Image from "react-bootstrap/Image";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "./header.css";
interface Props {}
interface State {}

export default class Header extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="header">
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand as={Link} to="/">
            <Image src={logo} roundedCircle className="brandImage" />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/your-finances">
              Your Finances
            </Nav.Link>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form> */}
        </Navbar>
      </div>
    );
  }
}
