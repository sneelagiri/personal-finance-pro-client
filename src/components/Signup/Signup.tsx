import React, { ReactElement, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { onError } from "apollo-link-error";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { SIGNUP_MUTATION } from "../../mutations/mutations";
import { USER_EXISTS_QUERY } from "../../queries/queries";
import { AUTH_TOKEN, USER_DATA } from "../../constants";
import "./signup.css";
interface Props {}

interface Response {
  signup: Token;
}

interface Token {
  token: string;
  user: UserData;
}

interface UserData {
  firstName: string;
  lastName: string;
  id: string;
}

export default function Signup({}: Props): ReactElement {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, error] = useMutation(SIGNUP_MUTATION);
  const { data, refetch } = useQuery(USER_EXISTS_QUERY, {
    variables: { email },
    errorPolicy: "ignore",
  });
  const history = useHistory();
  const _storeToken = (data: Response) => {
    const { token, user } = data.signup;
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(USER_DATA, JSON.stringify(user));
    history.push("/your-finances");
  };

  return (
    <div className="signup">
      <h1>Signup</h1>
      <Form
        className="signup-form"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const fetchToken = await signup({
            variables: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
            },
          });
          _storeToken(fetchToken.data);
        }}
      >
        <Form.Group controlId="formFirstName">
          <Form.Label>
            <b>First Name:</b>
          </Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setFirstName(e.target.value)
            }
            type="text"
            name="firstName"
            pattern="^[^<>#$%]*"
            title="Please don't use invalid characters such as < or $"
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
              setLastName(e.target.value)
            }
            type="text"
            name="lastName"
            placeholder="Your last name"
            pattern="^[^<>#$%]*"
            title="Please don't use invalid characters such as < or $"
            value={lastName}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>
            <b>Email address:</b>
          </Form.Label>
          <Form.Control
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              refetch();
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            value={email}
            placeholder="Your email"
            required
          />
          {data ? (
            <Form.Text className="red">
              This email address is in use. Please use a different email
              address.
            </Form.Text>
          ) : (
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>
            <b>Password:</b>
          </Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            type="password"
            name="password"
            value={password}
            placeholder="Enter a safe password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            autoComplete="new-password"
            required
          />
        </Form.Group>
        {data ? (
          <Button variant="primary" type="submit" disabled>
            Signup
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Signup
          </Button>
        )}
      </Form>
    </div>
  );
}
