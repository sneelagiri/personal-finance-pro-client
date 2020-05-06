import React, { ReactElement, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { POST_EXPENSE_MUTATION } from "../../mutations/mutations";
import { EXPENSES_QUERY, BUDGET_QUERY } from "../../queries/queries";
import "./expenses.css";
interface Props {}

export default function Expenses({}: Props): ReactElement {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDesc, setExpenseDesc] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const [postExpense] = useMutation(POST_EXPENSE_MUTATION);
  const {
    loading: loadingB,
    data: dataB,
    error: errorB,
    refetch: refetchB,
  } = useQuery(BUDGET_QUERY);
  const { loading, data, error, refetch } = useQuery(EXPENSES_QUERY);
  refetch();
  let counter = 0;
  const remainingAmount =
    dataB?.currentBudget.total - dataB?.currentBudget.totalExpenses;
  const currentExpense = parseFloat(expenseAmount) | 0;
  const newTotal = remainingAmount - currentExpense;
  const isAmountPositive = newTotal >= 0 ? true : false;
  return (
    <div className="expenses">
      <h1>Add an expense</h1>
      {!isAmountPositive ? (
        <div className="red">
          Your latest expense exceeds your remaining budget. Please increase
          your budget before adding the expense.
        </div>
      ) : null}
      <Form
        className="expenses-form"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const createdExpense = await postExpense({
            variables: {
              expenseAmount: parseFloat(expenseAmount),
              expenseDesc: expenseDesc,
              expenseCategory: expenseCategory,
              expenseDate: expenseDate,
              budgetId: dataB.currentBudget.id,
            },
          });
          refetch();
          refetch();
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
        {isAmountPositive ? (
          <Button variant="primary" type="submit">
            Save
          </Button>
        ) : (
          <Button variant="primary" type="submit" disabled>
            Save
          </Button>
        )}
      </Form>
      {loading ? (
        <h2>Loading expenses</h2>
      ) : error ? (
        <p>Error fetching expenses: {error}</p>
      ) : data.currentExpenses.length > 0 ? (
        <Table className="expenses-table" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Expense Amount</th>
              <th>Expense Date</th>
              <th>Expense Category</th>
              <th>Expense Description</th>
            </tr>
          </thead>
          <tbody>
            {data.currentExpenses.map((expense: any) => {
              counter++;
              return (
                <tr>
                  <td>{counter}</td>
                  <td>€{expense.expenseAmount}</td>
                  <td>{moment(expense.expenseDate).format("ll")}</td>
                  <td>{expense.expenseCategory}</td>
                  <td>{expense.expenseDesc}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h2 className="no-expenses">No expenses found</h2>
      )}
    </div>
  );
}
