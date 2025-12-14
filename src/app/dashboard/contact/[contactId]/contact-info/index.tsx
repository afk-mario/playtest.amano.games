import { Tables } from "types/supabase";

import { getSocialURL } from "utils/social";

import "./styles.css";
import Markdown from "react-markdown";

export default function PlaytesterInfo({
  playtester,
}: {
  playtester: Tables<"playtester"> & {
    social_profile: Tables<"social_profile">[];
  };
}) {
  const socials = playtester.social_profile.filter((item) => item.display_name);
  return (
    <div className="c-playtester-info">
      <header className="c-playtester-info-header">
        <div className="c-playtester-info-title">
          <h2>{playtester.name}</h2>
          <span>{playtester.email}</span>
        </div>
        <ul className="c-playtester-info-tags c-tag-list">
          {playtester.tags?.split(",").map((tag, i) => (
            <li key={i}>
              <span className="c-tag">{tag}</span>
            </li>
          ))}
        </ul>
      </header>
      {socials.length > 0 ? (
        <ul className="c-playtester-info-social-list | cluster">
          {playtester.social_profile.map((item) => {
            const url = getSocialURL(item);
            return (
              <li key={item.id}>
                <span className="c-playterster-info-social-platform">
                  {item.platform}
                </span>
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {item.display_name}
                  </a>
                ) : (
                  <span>{item.display_name}</span>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
      {playtester.description ? (
        <div className="c-playtester-info-description">
          <Markdown>{playtester.description || undefined}</Markdown>
        </div>
      ) : null}
    </div>
  );
}
