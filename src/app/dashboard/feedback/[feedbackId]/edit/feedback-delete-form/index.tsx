"use client";

import { useActionState } from "react";
import { deleteFeedback } from "../actions";
import Spinner from "components/spinner";
import { Trash } from "lucide-react";

import "./styles.css";

export default function FeedbackDeleteForm({
  feedbackId,
}: {
  feedbackId: string;
}) {
  const [, action, pending] = useActionState(deleteFeedback, false);
  return (
    <form className="feedback-delete-form">
      <input name="feedbackId" type="text" value={feedbackId} readOnly hidden />

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
