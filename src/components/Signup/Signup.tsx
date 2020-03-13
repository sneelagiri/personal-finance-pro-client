import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_MUTATION } from "../../mutations/mutations";
import gql from "graphql-tag";
import { History, LocationState } from "history";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AUTH_TOKEN } from "../../constants";

interface Props {
  history: History<LocationState>;
}

interface State {}

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
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
          }}
        >
          <Form.Group controlId="formFirstName">
            <Form.Label>
              <b>First Name:</b>
            </Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                this.setState({ firstName: e.target.value })
              }
              type="text"
              name="firstName"
              placeholder="Your first name"
              value={firstName}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>
              <b>Last Name:</b>
            </Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ lastName: e.target.value })
              }
              type="text"
              name="lastName"
              placeholder="Your last name"
              value={lastName}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>
              <b>Email address:</b>
            </Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ email: e.target.value })
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ password: e.target.value })
              }
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
            onCompleted={(data: React.ChangeEvent<HTMLInputElement>) =>
              this._confirm(data)
            }
          >
            {(mutation: any) => (
              <Button variant="success" type="submit" onClick={mutation}>
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
