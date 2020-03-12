import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { LOGIN_MUTATION } from "../../mutations/mutations";
import gql from "graphql-tag";
import { History, LocationState } from "history";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AUTH_TOKEN } from "../../constants";

interface Props {
  history: History<LocationState>;
}
interface State {}

export default class Login extends Component<Props, State> {
  state = {
    email: "",
    password: ""
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <div>
          <Form
            className="form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
            }}
          >
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ email: e.target.value })
                }
                type="text"
                name="email"
                placeholder="Your email address"
                value={email}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ password: e.target.value })
                }
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
              />
            </Form.Group>
            <Mutation
              mutation={LOGIN_MUTATION}
              variables={{ email, password }}
              onCompleted={(data: any) => this._confirm(data)}
            >
              {(mutation: any) => (
                <Button variant="primary" type="submit" onClick={mutation}>
                  Login
                </Button>
              )}
            </Mutation>
          </Form>
        </div>
      </div>
    );
  }
  _confirm = async (data: any) => {
    const { token } = data.login;
    this._saveUserData(token);
    console.log(token);
    this.props.history.push(`/`);
  };

  _saveUserData = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}
