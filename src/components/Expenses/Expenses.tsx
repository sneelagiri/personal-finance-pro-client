import React, { ReactElement, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { POST_EXPENSE_MUTATION } from "../../mutations/mutations";
import { BUDGET_QUERY } from "../../queries/queries";

interface Props {}

export default function Expenses({}: Props): ReactElement {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDesc, setExpenseDesc] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const [postExpense] = useMutation(POST_EXPENSE_MUTATION);

  const { loading, data, error } = useQuery(BUDGET_QUERY);

  const history = useHistory();
  return (
    <div>
      <h1>Add an expense</h1>
      <Form
        className="form"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          console.log(expenseAmount, expenseDesc, expenseCategory, expenseDate);

          const createdExpense = await postExpense({
            variables: {
              expenseAmount: parseFloat(expenseAmount),
              expenseDesc: expenseDesc,
              expenseCategory: expenseCategory,
              expenseDate: expenseDate,
              budgetId: data.currentBudget.id,
            },
          });
          console.log(createdExpense.errors);
        }}
      >
        <Form.Group controlId="formExpenseAmount">
          <Form.Label>
            <b>Expense Amount</b>
          </Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setExpenseAmount(e.target.value)
            }
            type="number"
            name="expenseAmount"
            placeholder="e.g. €450"
            value={expenseAmount}
            required
          />
        </Form.Group>
        <Form.Group controlId="formExpenseDate">
          <Form.Label>
            <b>Expense Date</b>
          </Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setExpenseDate(e.target.value)
            }
            type="date"
            name="expenseDate"
            value={expenseDate}
            required
          />
        </Form.Group>
        <Form.Group controlId="formExpenseCategory">
          <Form.Label>
            <b>Expense Category</b>
          </Form.Label>
          <Form.Control
            as="select"
            value={expenseCategory}
            name="expenseCategory"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setExpenseCategory(e.target.value)
            }
            required
          >
            <option value="">Select</option>
            <option>Rent/Mortgage</option>
            <option>Utilities</option>
            <option>Transportation</option>
            <option>Groceries</option>
            <option>Entertainment/Leisure</option>
            <option>Educational</option>
            <option>Health</option>
            <option>Loan</option>
            <option>Donations</option>
            <option>Misc.</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formExpenseDescription">
          <Form.Label>Expense Description</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setExpenseDesc(e.target.value)
            }
            as="textarea"
            rows="3"
            name="expenseDescription"
            value={expenseDesc}
            placeholder="e.g. Spent after work on Friday"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
      <Table></Table>
    </div>
  );
}
