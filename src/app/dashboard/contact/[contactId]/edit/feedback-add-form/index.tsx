"use client";

import { Tables } from "types/supabase";
import { useActionState } from "react";
import FeedbackForm from "containers/feedback/feedback-form";
import { feedbackAdd } from "app/dashboard/feedback/[feedbackId]/edit/actions";

export default function FeedbackAddForm({
  playtester,
  games,
}: {
  games: Tables<"game">[];
  playtester: Tables<"playtester">;
}) {
  const [, action, pending] = useActionState(feedbackAdd, false);
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
