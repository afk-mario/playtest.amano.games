import { Tables } from "types/supabase";

import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import * as HoverCard from "@radix-ui/react-hover-card";

import "./styles.css";
import { getGravatarUrl } from "utils/social/gravatar";
import { getSocialURL } from "utils/social";
import Markdown from "react-markdown";

export default function PlaytesterWidget({
  playtester,
}: {
  playtester: {
    social_profile?: Tables<"social_profile">[];
  } & Tables<"playtester">;
}) {
  const gravatar = getGravatarUrl(playtester.email || undefined);
  const playtesterSocialProfiles = playtester.social_profile;
  return (
    <div className="c-playterster-widget">
      <HoverCard.Root openDelay={300} closeDelay={10000}>
        <HoverCard.Trigger asChild>
          <Link href={`/dashboard/contact/${playtester.id}/edit/`}>
            <Avatar.Root className="c-playtester-widget-trigger c-avatar">
              <Avatar.Image
                className="c-avatar-image"
                src={playtester.avatar || gravatar}
                alt={playtester.name || undefined}
              />
              <Avatar.Fallback className="c-avatar-fallback" delayMs={600}>
                {playtester.id}
              </Avatar.Fallback>
            </Avatar.Root>
          </Link>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content
            className="c-playtester-widget-content"
            sideOffset={5}
          >
            <HoverCard.Arrow className="c-playterster-widget-arrow" />

            {playtesterSocialProfiles ? (
              <div className="c-playterster-widget-info">
                {playtesterSocialProfiles.length ? (
                  <ul className="c-playterster-widget-social-list">
                    {playtesterSocialProfiles.map((item) => {
                      const url = getSocialURL(item);
                      return (
                        <li
                          className="c-playterster-widget-social-item"
                          key={item.id}
                        >
                          <span className="c-playterster-widget-social-platform">
                            {item.platform}
                          </span>
                          {url ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
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
                {playtester.notes ? (
                  <div className="c-playterster-widget-notes">
                    <Markdown>{`**Notes:**\n${playtester.notes}`}</Markdown>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="c-playterster-widget-description">
              <Markdown>{playtester.description}</Markdown>
            </div>
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </div>
  );
}
