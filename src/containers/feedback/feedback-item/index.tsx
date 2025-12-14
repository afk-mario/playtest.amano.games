import { Tables } from "types/supabase";
import Markdown from "react-markdown";

import Link from "next/link";
import Time from "components/time";

import PlaytesterWidget from "components/playtester/playtester-widget";

import "./styles.css";

export default function FeedbackItem({
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
          <h3>
            <Link href={`/dashboard/contact/${playtester.id}/edit/`}>
              {playtester.name}
            </Link>{" "}
            @{" "}
            {feedback.url ? (
              <a target="_blank" rel="noopener noreferrer" href={feedback.url}>
                {feedback.platform}
              </a>
            ) : (
              feedback.platform
            )}
          </h3>
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
