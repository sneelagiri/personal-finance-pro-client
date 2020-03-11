import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AUTH_TOKEN } from "../../constants";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { History, LocationState } from "history";

interface Props {
  history: History<LocationState>;
}
interface State {}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
    }
  }
`;

export default class Signup extends Component<Props, State> {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  render() {
    const { firstName, lastName, email, password } = this.state;
    return (
      <div>
        <h1>Signup</h1>
        <Form
          className="form"
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
        >
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              onChange={(e: any) =>
                this.setState({ firstName: e.target.value })
              }
              type="text"
              name="firstName"
              placeholder="Your first name"
              value={firstName}
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              onChange={(e: any) => this.setState({ lastName: e.target.value })}
              type="text"
              name="lastName"
              placeholder="Your last name"
              value={lastName}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>
              <b>Email address:</b>
            </Form.Label>
            <Form.Control
              onChange={(e: any) => this.setState({ email: e.target.value })}
              type="email"
              name="email"
              value={email}
              placeholder="Your email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>
              <b>Password:</b>
            </Form.Label>
            <Form.Control
              onChange={(e: any) => this.setState({ password: e.target.value })}
              type="password"
              name="password"
              value={password}
              placeholder="Enter a safe password"
              required
            />
          </Form.Group>
          <Mutation
            mutation={SIGNUP_MUTATION}
            variables={{ email, password, firstName, lastName }}
            onCompleted={(data: any) => this._confirm(data)}
          >
            {(mutation: any) => (
              <Button variant="primary" type="submit" onClick={mutation}>
                Signup
              </Button>
            )}
          </Mutation>
        </Form>
      </div>
    );
  }
  _confirm = async (data: any) => {
    const { token } = data.signup;
    this._saveUserData(token);
    console.log(token);
    this.props.history.push(`/`);
  };

  _saveUserData = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}
