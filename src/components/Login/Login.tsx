import React, { ReactElement, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LOGIN_MUTATION } from "../../mutations/mutations";
import { AUTH_TOKEN, LATEST_BUDGET, USER_DATA } from "../../constants";
import "./login.css";
interface Props {}

interface Response {
  login: LoginData;
}

interface LoginData {
  token: string;
  user: UserData;
  latestBudget: BudgetData;
}

interface UserData {
  firstName: string;
  lastName: string;
}

interface BudgetData {
  startDate: string;
  endDate: string;
}

export default function Login({}: Props): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [login, { error }] = useMutation(LOGIN_MUTATION, {
    errorPolicy: "ignore",
  });
  const history = useHistory();

  const _confirm = async (data: Response) => {
    const { token, user, latestBudget } = data.login;
    _saveUserData(token, user, latestBudget);
    if (latestBudget) {
      history.push(`/overview`);
    } else {
      history.push(`/your-finances`);
    }
  };
  console.log(error?.graphQLErrors);
  const _saveUserData = (token: string, user: object, latestBudget: object) => {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(USER_DATA, JSON.stringify(user));
    if (typeof latestBudget === "object") {
      localStorage.setItem(LATEST_BUDGET, JSON.stringify(latestBudget));
    }
  };
  const errorMessage = error ? error.graphQLErrors[0].message : null;

  return (
    <div className="login">
      <h1>Login</h1>
      {errorMessage ? <h2 className="invalid">{errorMessage}</h2> : null}
      <div>
        <Form
          className="login-form"
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const authUser = await login({
              variables: {
                email: email,
                password: password,
              },
            }).catch((error) => setValid(false));
            if (authUser) {
              _confirm(authUser.data);
            }
          }}
        >
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              type="text"
              name="email"
              placeholder="Your email address"
              value={email}
              className="field"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              type="password"
              name="password"
              placeholder="Your password"
              value={password}
              className="field"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
