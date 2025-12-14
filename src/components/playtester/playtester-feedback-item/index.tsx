import { Tables } from "types/supabase";
import Markdown from "react-markdown";

import Link from "next/link";
import PlaytesterWidget from "../playtester-widget";
import Time from "components/time";

import "./styles.css";

export function PlaytesterFeedbackItem({
  playtester,
  feedback,
  game,
}: {
  feedback: Tables<"feedback">;
  game?: Tables<"game">;
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
        <header className="cluster">
          <Link href={`/dashboard/playtester/${playtester.id}/edit/`}>
            <h3>
              {playtester.name} @ {feedback.platform}
            </h3>
          </Link>
          <Link href={`/dashboard/feedback/${feedback.id}/edit/`}>
            <Time formatStr="PP hh:mm:ss">{feedback.timestamp}</Time>
          </Link>
        </header>
        <div className="c-feedback-item-text | stack">
          <Markdown>{feedback.text}</Markdown>
        </div>
        <footer>
          {game ? <span className="c-tag">{game.name}</span> : null}
        </footer>
      </div>
    </article>
  );
}
