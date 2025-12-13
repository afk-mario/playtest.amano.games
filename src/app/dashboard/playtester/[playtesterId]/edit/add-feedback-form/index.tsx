import { Tables } from "types/supabase";
import { SendHorizontal } from "lucide-react";
import Listbox from "components/listbox";
import { addFeedback } from "../actions";

export default function PlaytesterAddFeedbackForm({
  playtester,
  games,
}: {
  games: Tables<"game">[];
  playtester: Tables<"playtester"> & {
    social_profile: Tables<"social_profile">[];
  };
}) {
  const gameOptions = games.map((item) => {
    return {
      value: item.id.toString(),
      children: item.name,
    };
  });
  return (
    <form action={addFeedback}>
      <h3>Add feedback</h3>
      <input
        name="playtesterId"
        type="text"
        value={playtester.id}
        readOnly
        hidden
      />
      <div className="cluster">
        <label>
          <span>Platform</span>
          <input name="feedbackPlatform" type="text" required />
        </label>
        <label>
          <span>Game</span>
          <Listbox placeholder="Choose a game" options={gameOptions} />
        </label>
      </div>
      <label>
        <span>Feedback</span>
        <textarea name="feedbackText" rows={10} required />
      </label>
      <button className="c-button" type="submit">
        <SendHorizontal /> Post
      </button>
    </form>
  );
}
