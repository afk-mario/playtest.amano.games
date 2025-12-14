"use server";

import { createClient } from "utils/supabase/server";
import Link from "next/link";

import FeedbackEditForm from "./feedback-edit-form";
import FeedbackDeleteForm from "./feedback-delete-form";
import PlaytesterWidget from "components/playtester/playtester-widget";

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

  const contactQuery = await supabase
    .from("playtester")
    .select("*,social_profile(*)")
    .eq("id", feedbackQuery.data.playtester)
    .single();

  if (contactQuery.error) {
    return (
      <div>
        <h2>Error Playtesters</h2>
        <pre>{JSON.stringify(contactQuery.error, null, 2)}</pre>
      </div>
    );
  }

  const games = gamesQuery.data;
  const feedback = feedbackQuery.data;
  const contact = contactQuery.data;

  return (
    <div className="p-feedback-edit | stack">
      <header>
        <PlaytesterWidget playtester={contact} />
        <h2>
          Edit Feedback by{" "}
          <Link href={`/dashboard/contact/${contact.id}/edit`}>
            {contact.name}
          </Link>
        </h2>
        <FeedbackDeleteForm feedbackId={feedbackId} />
      </header>
      <FeedbackEditForm feedback={feedback} games={games} />
    </div>
  );
}
