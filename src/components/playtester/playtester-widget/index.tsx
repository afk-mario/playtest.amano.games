import { Tables } from "types/supabase";

import * as Avatar from "@radix-ui/react-avatar";
import * as HoverCard from "@radix-ui/react-hover-card";

import "./styles.css";

export default function PlaytesterWidget({
  playtester,
}: {
  playtester: Tables<"playtester">;
}) {
  return (
    <div className="c-playterster-widget">
      <HoverCard.Root openDelay={300} closeDelay={400}>
        <HoverCard.Trigger asChild>
          <Avatar.Root className="c-playtester-widget-trigger c-avatar">
            <Avatar.Image
              className="c-avatar-image"
              src={playtester.avatar || undefined}
              alt={playtester.name || undefined}
            />
            <Avatar.Fallback className="c-avatar-fallback" delayMs={600}>
              --
            </Avatar.Fallback>
          </Avatar.Root>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content
            className="c-playtester-widget-content"
            sideOffset={5}
          >
            <HoverCard.Arrow className="c-playterster-widget-arrow" />
            <p>{playtester.description}</p>
            <p>{playtester.notes}</p>
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </div>
  );
}
