"use client";

import { Tables } from "types/supabase";
import { editFeedback } from "../actions";
import { useActionState } from "react";
import FeedbackForm from "containers/feedback/feedback-form";

export default function FeedbackEditForm({
  feedback,
  games,
}: {
  feedback: Tables<"feedback">;
  games: Tables<"game">[];
}) {
  const [, action, pending] = useActionState(editFeedback, false);
  return (
    <FeedbackForm
      title="Edit Feedback"
      action={action}
      pending={pending}
      feedback={feedback}
      games={games}
    />
  );
}
