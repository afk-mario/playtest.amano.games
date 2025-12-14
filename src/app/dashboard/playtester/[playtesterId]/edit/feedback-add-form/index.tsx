"use client";

import { Tables } from "types/supabase";
import { addFeedback } from "../actions";
import { useActionState } from "react";
import FeedbackForm from "containers/feedback/feedback-form";

export default function FeedbackAddForm({
  playtester,
  games,
}: {
  games: Tables<"game">[];
  playtester: Tables<"playtester">;
}) {
  const [, action, pending] = useActionState(addFeedback, false);
  return (
    <FeedbackForm
      title="Add Feedback"
      action={action}
      pending={pending}
      playtester={playtester}
      games={games}
    />
  );
}
