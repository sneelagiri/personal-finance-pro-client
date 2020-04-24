import React, { ReactElement, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { BUDGET_ENTRY_MUTATION } from "../../mutations/mutations";
import { CURRENT_BUDGET } from "../../constants";
import "./budget-entry.css";
interface Props {}

interface PostBudget {
  postBudget: {
    total: string;
  };
}

export default function BudgetEntry({}: Props): ReactElement {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [stringTotal, setStringTotal] = useState("");
  const [total, setTotal] = useState(0);
  const [stringSavingsTarget, setStringSavingsTarget] = useState("");
  const [savingsTarget, setSavingsTarget] = useState(0);

  const [postBudget] = useMutation(BUDGET_ENTRY_MUTATION);

  const history = useHistory();
  const _confirm = async (data: PostBudget) => {
    const { postBudget } = data;
    _saveUserData(postBudget);
    history.push(`/overview`);
  };

  const _saveUserData = (currentBudget: object) => {
    localStorage.setItem(CURRENT_BUDGET, JSON.stringify(currentBudget));
  };

  return (
    <div>
      <h1>Start here!</h1>
      <Form
        className="form"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const createdBudget = await postBudget({
            variables: {
              startDate: startDate,
              endDate: endDateTime,
              total: total,
              savingsTarget: savingsTarget,
            },
          });
          _confirm(createdBudget.data);
        }}
      >
        <Form.Group controlId="formStartDate">
          <Form.Label>Select Start Date</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStartDate(e.target.value);
              const endDate = moment(e.target.value, "YYYY-MM-DD")
                .add({ months: 1 })
                .subtract(1, "days")
                .format("YYYY-MM-DD");

              const endDateTime = moment(e.target.value, "YYYY-MM-DDTHH:mm:ss")
                .add({ seconds: 59, minutes: 59, hours: 23, months: 1 })
                .subtract(1, "days")
                .format("YYYY-MM-DDTHH:mm:ss");
              setEndDateTime(endDateTime);
              setEndDate(endDate);
            }}
            type="date"
            name="startDate"
            placeholder="Budget start date"
            value={startDate}
          />
        </Form.Group>
        <Form.Group controlId="formEndDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ endDate: e.target.value })}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStringTotal(e.target.value);
              setTotal(parseFloat(e.target.value));
            }}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStringSavingsTarget(e.target.value);
              setSavingsTarget(parseFloat(e.target.value));
            }}
            type="number"
            name="total"
            value={stringSavingsTarget}
            placeholder="e.g. 30%"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}
