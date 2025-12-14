"use client";

import { useActionState } from "react";
import { contactNew } from "../actions";

import Spinner from "components/spinner";
import { CirclePlus } from "lucide-react";

import "./styles.css";

export default function Page() {
  const [, action, pending] = useActionState(contactNew, false);
  return (
    <div className="p-contact-new stack">
      <header>
        <h2>New Contact</h2>
      </header>
      <form className="c-contact-new-form">
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="name" required />
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />

        <footer>
          <button className="c-button" formAction={action} disabled={pending}>
            {!pending ? <CirclePlus /> : <Spinner />}
            Create
          </button>
        </footer>
      </form>
    </div>
  );
}
