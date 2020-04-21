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
import {
  AUTH_TOKEN,
  LATEST_BUDGET,
  CURRENT_BUDGET,
  USER_DATA,
} from "../../constants";
import "./header.css";

interface Props extends RouteComponentProps<any> {}
interface State {}
interface UserData {
  firstName: string;
  lastName: string;
  __typename: string;
}
class Header extends Component<Props, State> {
  state = {};

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const userDataJSON = localStorage.getItem(USER_DATA);
    let userData: string | UserData = "";
    if (typeof userDataJSON === "string") {
      userData = JSON.parse(userDataJSON);
    }
    const latestBudgetJSON = localStorage.getItem(LATEST_BUDGET);
    let latestBudget = "";
    if (typeof latestBudgetJSON === "string" && latestBudgetJSON !== "null") {
      latestBudget = JSON.parse(latestBudgetJSON);
    }
    const overviewBudgetJSON = localStorage.getItem(CURRENT_BUDGET);
    let overviewBudget = "";
    if (typeof overviewBudgetJSON === "string") {
      overviewBudget = JSON.parse(overviewBudgetJSON);
    }
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
              {authToken &&
              typeof latestBudget === "string" &&
              typeof overviewBudget === "string" ? (
                <Nav.Link as={Link} to="/your-finances">
                  Your Finances
                </Nav.Link>
              ) : (authToken && typeof overviewBudget === "object") ||
                typeof latestBudget === "object" ? (
                <>
                  <Nav.Link as={Link} to="/overview">
                    Overview
                  </Nav.Link>
                  <Nav.Link as={Link} to="/expenses">
                    Expenses
                  </Nav.Link>
                </>
              ) : null}
            </Nav>
            {authToken && (
              <Nav>
                {typeof userData === "object" && (
                  <Navbar.Text className="headerText">
                    Signed in as: {`${userData.firstName} ${userData.lastName}`}
                  </Navbar.Text>
                )}

                <Button
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    localStorage.removeItem(CURRENT_BUDGET);
                    localStorage.removeItem(LATEST_BUDGET);
                    localStorage.removeItem(USER_DATA);
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
