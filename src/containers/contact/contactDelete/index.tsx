"use client";

import { useActionState } from "react";
import Spinner from "components/spinner";
import { Trash } from "lucide-react";
import { contactDelete } from "app/dashboard/contact/actions";

import "./styles.css";

export default function ContactDeleteForm({
  contactId,
}: {
  contactId: string;
}) {
  const [, action, pending] = useActionState(contactDelete, false);
  return (
    <form className="contact-delete-form">
      <input name="contactId" type="text" value={contactId} readOnly hidden />

      <button
        className="c-button"
        type="submit"
        formAction={action}
        disabled={pending}
      >
        {pending ? <Spinner /> : <Trash />}
      </button>
    </form>
  );
}
