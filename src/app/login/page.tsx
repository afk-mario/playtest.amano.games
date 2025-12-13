"use client";

import { useActionState } from "react";
import { login } from "./actions";

import "./styles.css";
import Spinner from "components/spinner";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const [, action, pending] = useActionState(login, false);
  return (
    <form className="c-login-form">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />

      <div className="c-login-form-actions cluster">
        <button className="c-button" formAction={action} disabled={pending}>
          {!pending ? <LogIn /> : <Spinner />}
          Log in
        </button>
      </div>
    </form>
  );
}
