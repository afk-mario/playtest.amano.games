import { Tables } from "types/supabase";

import { getSocialURL } from "utils/social";

import "./styles.css";

export default function PlaytesterInfo({
  playtester,
}: {
  playtester: Tables<"playtester"> & {
    social_profile: Tables<"social_profile">[];
  };
}) {
  return (
    <div className="c-playtester-info">
      <header className="c-playtester-info-header">
        <h2>{playtester.name}</h2>
        <span>{playtester.email}</span>
      </header>
      {playtester.social_profile.length > 0 ? (
        <ul className="c-playtester-info-social-list | cluster">
          {playtester.social_profile.map((item) => {
            const url = getSocialURL(item);
            return (
              <li key={item.id}>
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
      <ul className="c-playtester-info-tags c-tag-list">
        {playtester.tags?.split(",").map((tag, i) => (
          <li key={i}>
            <span className="c-tag">{tag}</span>
          </li>
        ))}
      </ul>
      <p>{playtester.description || undefined}</p>
    </div>
  );
}
