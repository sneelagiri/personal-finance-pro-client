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

export default class BudgetEntry extends Component<Props, State> {
  state = {
    startDate: "",
    endDate: "",
    total: 0,
    savingsTarget: 0
  };

  render() {
    const { startDate, endDate, total, savingsTarget } = this.state;
    return (
      <div>
        <h1>Start here!</h1>
        <Form
          className="form"
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
        >
          <Form.Group controlId="formStartDate">
            <Form.Label>Select Start Date</Form.Label>
            <Form.Control
              onChange={(e: any) =>
                this.setState({ startDate: e.target.value })
              }
              type="date"
              name="startDate"
              placeholder="Budget start date"
              value={startDate}
            />
          </Form.Group>
          <Form.Group controlId="formEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              onChange={(e: any) => this.setState({ lastName: e.target.value })}
              type="date"
              name="endDate"
              value={endDate}
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
}
