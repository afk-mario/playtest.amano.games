import { Tables } from "types/supabase";
import Markdown from "react-markdown";

import PlaytesterWidget from "../playtester-widget";
import Time from "components/time";

import "./styles.css";

export function PlaytesterFeedbackItem({
  playtester,
  feedback,
}: {
  feedback: Tables<"feedback">;
  playtester: {
    social_profile: Tables<"social_profile">[];
  } & Tables<"playtester">;
}) {
  return (
    <article className="c-feedback-item ">
      <div className="c-feedback-item-widget">
        <PlaytesterWidget playtester={playtester} />
      </div>
      <div className="c-feedback-item-content">
        <header>
          <h3>
            {playtester.name} @ {feedback.platform}
          </h3>
          <Time formatStr="PP hh:mm:ss">{feedback.timestamp}</Time>
        </header>
        <hr />
        <div className="c-feedback-item-text | stack">
          <Markdown>{feedback.text}</Markdown>
        </div>
      </div>
    </article>
  );
}
