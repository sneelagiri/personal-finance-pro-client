import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Mutation } from "react-apollo";

import gql from "graphql-tag";
import { History, LocationState } from "history";
import moment from "moment";
import { BUDGET_ENTRY_MUTATION } from "../../mutations/mutations";
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
    endDate: "",
    stringTotal: "",
    total: 0.0,
    stringSavingsTarget: "",
    savingsTarget: 0.0
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
                this.setState({
                  startDate: e.target.value,
                  endDate: moment(e.target.value, "YYYY-MM-DD")
                    .add(1, "months")
                    .subtract(1, "days")
                    .format("YYYY-MM-DD")
                })
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
              // onChange={(e: any) => this.setState({ endDate: e.target.value })}
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
                this.setState({
                  stringTotal: e.target.value,
                  total: parseFloat(e.target.value)
                })
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
                  stringSavingsTarget: e.target.value,
                  savingsTarget: parseFloat(e.target.value)
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
            onError={(error: any) => {
              console.log(error.networkError.result.errors);
              console.log(error.graphQLErrors);
            }}
          >
            {(mutation: any) => (
              <Button variant="success" type="submit" onClick={mutation}>
                Save
              </Button>
            )}
          </Mutation>
        </Form>
      </div>
    );
  }
  _confirm = async (data: any) => {
    console.log(data);
    this.props.history.push(`/`);
  };
}
