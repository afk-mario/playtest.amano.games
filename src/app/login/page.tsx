import { login } from "./actions";

import "./styles.css";

export default function LoginPage() {
  return (
    <form className="c-login-form">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />

      <div className="c-login-form-actions cluster">
        <button formAction={login}>Log in</button>
      </div>
    </form>
  );
}
