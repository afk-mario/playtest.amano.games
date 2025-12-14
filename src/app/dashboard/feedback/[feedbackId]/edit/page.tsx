"use server";

import { createClient } from "utils/supabase/server";
import FeedbackEditForm from "./feedback-edit-form";
import FeedbackDeleteForm from "./feedback-delete-form";

import "./styles.css";

export default async function Page(props: {
  params: Promise<{ feedbackId: string }>;
}) {
  const params = await props.params;
  const { feedbackId } = params;
  const supabase = await createClient();
  const feedbackQuery = await supabase
    .from("feedback")
    .select(`*`)
    .eq("id", feedbackId)
    .single();

  if (feedbackQuery.error) {
    return (
      <div>
        <h2>Error Feedback</h2>
        <pre>{JSON.stringify(feedbackQuery.error, null, 2)}</pre>
      </div>
    );
  }

  const gamesQuery = await supabase.from("game").select("*");

  if (gamesQuery.error) {
    return (
      <div>
        <h2>Error Playtesters</h2>
        <pre>{JSON.stringify(gamesQuery.error, null, 2)}</pre>
      </div>
    );
  }

  const games = gamesQuery.data;
  const feedback = feedbackQuery.data;

  return (
    <div className="p-feedback-edit | stack">
      <header>
        <h2>Edit Feedback {feedbackId}</h2>
        <FeedbackDeleteForm feedbackId={feedbackId} />
      </header>
      <FeedbackEditForm feedback={feedback} games={games} />
    </div>
  );
}
