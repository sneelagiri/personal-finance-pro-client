import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
import Image from "react-bootstrap/Image";
import logo from "../../assets/logo.png";
import { AUTH_TOKEN } from "../../constants";
import "./header.css";

interface Props extends RouteComponentProps<any> {}
interface State {}

class Header extends Component<Props, State> {
  state = {};

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    console.log(authToken);
    return (
      <div className="header">
        <Navbar bg="success" variant="dark">
          <Navbar.Brand as={Link} to="/">
            <Image src={logo} roundedCircle className="brandImage" />
          </Navbar.Brand>
          <Nav className="mr-auto">
            {authToken == null && (
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            )}
            {authToken == null && (
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            )}
            {authToken == null && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {authToken && (
              <Nav.Link as={Link} to="/your-finances">
                Your Finances
              </Nav.Link>
            )}
          </Nav>
          <Navbar.Toggle />
          {authToken && (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>Signed in as: //todo</Navbar.Text>
              <Button
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN);
                  this.props.history.push(`/`);
                }}
              >
                Logout
              </Button>
            </Navbar.Collapse>
          )}
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form> */}
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);
