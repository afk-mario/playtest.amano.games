"use client";

import { parseISO, format } from "date-fns";
import { Tables } from "types/supabase";
import { SendHorizontal } from "lucide-react";
import Listbox from "components/listbox";
import Spinner from "components/spinner";

function getDateValue(timestamp?: string) {
  if (!timestamp) return undefined;
  const date = parseISO(timestamp);
  const res = format(date, "yyyy-MM-dd'T'HH:mm");
  console.log(res);
  return res;
}

export default function FeedbackForm({
  title,
  action,
  pending,
  playtester,
  games,
  feedback,
}: {
  title: string;
  action: (formData: FormData) => void;
  pending: boolean;
  feedback?: Tables<"feedback">;
  games: Tables<"game">[];
  playtester?: Tables<"playtester">;
}) {
  const gameOptions = games.map((item) => {
    return {
      value: item.id.toString(),
      children: item.name,
    };
  });
  return (
    <form action={action}>
      <h3>{title}</h3>
      <input
        name="feedbackId"
        type="text"
        value={feedback?.id || undefined}
        readOnly
        hidden
      />
      <input
        name="playtesterId"
        type="text"
        value={playtester?.id || undefined}
        readOnly
        hidden
      />
      <div className="cluster">
        <label>
          <span>Platform</span>
          <input
            name="feedbackPlatform"
            type="text"
            defaultValue={feedback?.platform || undefined}
            required
          />
        </label>
        <label>
          <span>Game</span>
          <Listbox
            required
            name="gameId"
            placeholder="Choose a game"
            defaultValue={feedback?.game?.toString() || undefined}
            options={gameOptions}
          />
        </label>
      </div>
      <div className="cluster">
        <label>
          <span>Url</span>
          <input
            name="feedbackUrl"
            type="url"
            defaultValue={feedback?.url || undefined}
          />
        </label>
        <label htmlFor="">
          <span>Date</span>
          <input
            type="datetime-local"
            name="feedbackTimestamp"
            defaultValue={getDateValue(feedback?.timestamp)}
          />
        </label>
      </div>
      <label>
        <span>Feedback</span>
        <textarea
          name="feedbackText"
          rows={10}
          defaultValue={feedback?.text || undefined}
          required
        />
      </label>
      <footer>
        <button className="c-button" type="submit" disabled={pending}>
          {pending ? <Spinner /> : <SendHorizontal />} Post
        </button>
      </footer>
    </form>
  );
}
