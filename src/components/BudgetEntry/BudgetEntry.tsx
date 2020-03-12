import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { History, LocationState } from "history";
import moment from "moment";
import { AUTH_TOKEN } from "../../constants";

interface Props {
  history: History<LocationState>;
}
interface State {
  startDate: string;
  endDate: string;
  stringTotal: string;
  total: number;
  stringSavingsTarget: string;
  savingsTarget: number;
}

export default class BudgetEntry extends Component<Props, State> {
  state: State = {
    startDate: "",
    endDate: moment(this.state.startDate)
      .add(1, "month")
      .format("YYYY-MM-DD"),
    stringTotal: "",
    total: parseFloat(this.state.stringTotal),
    stringSavingsTarget: "",
    savingsTarget: parseFloat(this.state.stringSavingsTarget)
  };

  render() {
    const {
      startDate,
      endDate,
      stringTotal,
      stringSavingsTarget,
      total,
      savingsTarget
    } = this.state;
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
              onChange={(e: any) => this.setState({ endDate: e.target.value })}
              type="date"
              name="endDate"
              value={endDate}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="formBudget">
            <Form.Label>
              <b>This month's budget</b>
            </Form.Label>
            <Form.Control
              as="input"
              onChange={(e: any) =>
                this.setState({ stringTotal: e.target.value })
              }
              type="number"
              name="total"
              value={stringTotal}
              placeholder="e.g. 2450.00"
              required
            />
          </Form.Group>
          <Form.Group controlId="formSavings">
            <Form.Label>
              <b>This month's savings target</b>
            </Form.Label>
            <Form.Control
              onChange={(e: any) =>
                this.setState({
                  stringSavingsTarget: e.target.value
                })
              }
              type="number"
              name="total"
              value={stringSavingsTarget}
              placeholder="e.g. 30%"
              required
            />
          </Form.Group>
          <Mutation
            mutation={BUDGET_ENTRY_MUTATION}
            variables={{
              startDate,
              endDate,
              total,
              savingsTarget
            }}
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
