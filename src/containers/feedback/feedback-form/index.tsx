"use client";

import { Tables } from "types/supabase";
import { SendHorizontal } from "lucide-react";
import Listbox from "components/listbox";
import Spinner from "components/spinner";

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
      <label>
        <span>Url</span>
        <input
          name="feedbackUrl"
          type="url"
          defaultValue={feedback?.url || undefined}
        />
      </label>
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
