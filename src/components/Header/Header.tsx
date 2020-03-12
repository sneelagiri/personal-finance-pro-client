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
    // console.log(authToken);
    return (
      <div className="header">
        <Navbar bg="success" variant="dark">
          <Navbar.Brand as={Link} to="/">
            <Image src={logo} roundedCircle className="brandImage" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto linkColor">
              {authToken == null && (
                <>
                  <Nav.Link as={Link} to="/" className="linkColor">
                    Home
                  </Nav.Link>

                  <Nav.Link as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </>
              )}
              {authToken && (
                <Nav.Link as={Link} to="/your-finances">
                  Your Finances
                </Nav.Link>
              )}
            </Nav>
            {authToken && (
              <Nav>
                <Navbar.Text className="headerText">
                  Signed in as: //todo{" "}
                </Navbar.Text>
                <Button
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    this.props.history.push(`/`);
                  }}
                  className="headerButton"
                  variant="outline-light"
                >
                  Logout
                </Button>
              </Nav>
            )}
            {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form> */}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);
