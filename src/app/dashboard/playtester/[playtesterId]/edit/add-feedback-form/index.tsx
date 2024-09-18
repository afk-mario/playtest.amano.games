import { Tables } from "types/supabase";
import { addFeedback } from "../actions";

export default function PlaytesterAddFeedbackForm({
  playtester,
}: {
  playtester: Tables<"playtester"> & {
    social_profile: Tables<"social_profile">[];
  };
}) {
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
      <label>
        <span>Platform</span>
        <input name="feedbackPlatform" type="text" />
      </label>
      <label>
        <span>Feedback</span>
        <textarea name="feedbackText" rows={10} />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}
