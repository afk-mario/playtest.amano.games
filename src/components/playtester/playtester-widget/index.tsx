import { Tables } from "types/supabase";

import * as Avatar from "@radix-ui/react-avatar";
import * as HoverCard from "@radix-ui/react-hover-card";

import "./styles.css";
import { getGravatarUrl } from "utils/social/gravatar";
import { getSocialURL } from "utils/social";

export default function PlaytesterWidget({
  playtester,
}: {
  playtester: {
    social_profile: Tables<"social_profile">[];
  } & Tables<"playtester">;
}) {
  const gravatar = getGravatarUrl(playtester.email || undefined);
  return (
    <div className="c-playterster-widget">
      <HoverCard.Root openDelay={300} closeDelay={400}>
        <HoverCard.Trigger asChild>
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
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content
            className="c-playtester-widget-content"
            sideOffset={5}
          >
            <HoverCard.Arrow className="c-playterster-widget-arrow" />
            {playtester.social_profile.length > 0 ? (
              <ul className="c-playterster-widget-social-list | cluster">
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
            {playtester.notes ? (
              <>
                <p>{playtester.notes}</p>
                <hr />
              </>
            ) : null}
            <p>{playtester.description}</p>
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </div>
  );
}
