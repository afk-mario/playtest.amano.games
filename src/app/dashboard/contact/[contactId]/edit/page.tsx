"use server";

import Link from "next/link";
import { createClient } from "utils/supabase/server";

import KeyAddForm from "./key-add-form";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ChangeAvatarForm from "./avatar-form";

import PlaytesterInfo from "../contact-info";
import PlaytesterDiscordForm from "./discord-form";

import FeedbackAddForm from "./feedback-add-form";
import { Tables } from "types/supabase";
import KeyEditForm from "./key-edit-form";
import PlaytesterNoteForm from "components/playtester/playtester-note-form";

import "./styles.css";
import FeedbackItem from "containers/feedback/feedback-item";
import ContactDeleteForm from "containers/contact/contactDelete";
import SocialProfileForm from "containers/social/social-form";

export default async function Page(props: {
  params: Promise<{ contactId: string }>;
}) {
  const params = await props.params;
  const { contactId } = params;
  const supabase = await createClient();
  const playtesterQuery = await supabase
    .from("playtester")
    .select(
      `*, game_key(*, game:game(*)), social_profile(*), feedback(*, game(*))`
    )
    .eq("id", contactId)
    .single();

  if (playtesterQuery.error) {
    return (
      <div>
        <h2>Error Playtester</h2>
        <pre>{JSON.stringify(playtesterQuery.error, null, 2)}</pre>
      </div>
    );
  }

  const playtestersQuery = await supabase
    .from("playtester")
    .select(`id`)
    .order("id");

  if (playtestersQuery.error) {
    return (
      <div>
        <h2>Error Playtesters</h2>
        <pre>{JSON.stringify(playtestersQuery.error, null, 2)}</pre>
      </div>
    );
  }

  const gamesQuery = await supabase.from("game").select("*");

  if (gamesQuery.error) {
    return (
      <div>
        <h2>Error Playtesters</h2>
        <pre>{JSON.stringify(gamesQuery.error, null, 2)}</pre>
      </div>
    );
  }

  const gameKeysQuery = await supabase
    .from("game_key")
    .select(`*`)
    .is("playtester", null);

  if (gameKeysQuery.error) {
    return (
      <div>
        <h2>Error Keys</h2>
        <pre>{JSON.stringify(gameKeysQuery.error, null, 2)}</pre>
      </div>
    );
  }

  const feedbackQuery = await supabase
    .from("feedback")
    .select(`*, game(*)`)
    .eq("playtester", contactId)
    .order("timestamp", { ascending: false });

  if (feedbackQuery.error) {
    return (
      <div>
        <h2>Error Keys</h2>
        <pre>{JSON.stringify(feedbackQuery.error, null, 2)}</pre>
      </div>
    );
  }

  const games = gamesQuery.data;
  const playtester = playtesterQuery.data;
  const discordProfile = playtester.social_profile.find(
    (item: Tables<"social_profile">) => item.platform === "discord"
  );
  const twitterProfile = playtester.social_profile.find(
    (item: Tables<"social_profile">) => item.platform === "twitter"
  );
  const blueskyProfile = playtester.social_profile.find(
    (item: Tables<"social_profile">) => item.platform === "bluesky"
  );
  const mastodonProfile = playtester.social_profile.find(
    (item: Tables<"social_profile">) => item.platform === "mastodon"
  );

  const currentIndex = playtestersQuery.data.findIndex(
    (item) => item.id === Number(contactId)
  );

  const nextId =
    currentIndex < playtestersQuery.data.length - 1 ? currentIndex + 1 : null;
  const prevId = currentIndex > 0 ? currentIndex - 1 : null;

  return (
    <div className="p-playtester-edit | stack">
      <header className="p-playtester-edit-header | cluster">
        <div className="cluster">
          {prevId != null ? (
            <Link
              href={`/dashboard/contact/${playtestersQuery.data[prevId].id}/edit`}
            >
              <ChevronLeft />
            </Link>
          ) : null}
        </div>
        <h2>{playtester.name}</h2>
        {nextId ? (
          <Link
            href={`/dashboard/contact/${playtestersQuery.data[nextId].id}/edit`}
          >
            <ChevronRight />
          </Link>
        ) : null}
      </header>
      <div className="p-playtester-edit-info-container ">
        <ChangeAvatarForm
          playtesterId={contactId}
          avatar={playtester.avatar || undefined}
        />
        <PlaytesterInfo playtester={playtester} />
      </div>

      {playtester.game_key.length > 0
        ? playtester.game_key.map(
            (item: Tables<"game_key"> & { game: Tables<"game"> }) => {
              return (
                <KeyEditForm
                  key={item.id}
                  gameKey={item}
                  playtester={playtester}
                />
              );
            }
          )
        : null}

      <KeyAddForm
        playtesterId={Number(contactId)}
        defaultKeys={gameKeysQuery.data}
      />

      <PlaytesterNoteForm playtesterId={contactId} notes={playtester.notes} />
      <SocialProfileForm
        playtester={playtester}
        platform={"discord"}
        socialProfile={discordProfile || undefined}
      />
      <SocialProfileForm
        playtester={playtester}
        platform={"mastodon"}
        socialProfile={mastodonProfile}
      />
      <SocialProfileForm
        playtester={playtester}
        platform={"bluesky"}
        socialProfile={blueskyProfile}
      />
      <SocialProfileForm
        playtester={playtester}
        platform={"twitter"}
        socialProfile={twitterProfile}
      />
      <FeedbackAddForm playtester={playtester} games={games} />
      <div className="stack">
        {feedbackQuery.data.map((item) => {
          return (
            <FeedbackItem
              key={item.id}
              feedback={item}
              playtester={playtester}
              game={item.game}
            />
          );
        })}
      </div>
      <ContactDeleteForm contactId={contactId} />
      <details>
        <summary>Show data</summary>
        <pre
          style={{
            padding: "var(--spacing-02)",
            border: "var(--border)",
            borderRadius: "var(--border-radius)",
            background: "var(--color-bg-alt)",
            width: "100%",
            overflow: "auto",
          }}
        >
          {JSON.stringify(playtester, null, 2)}
        </pre>
      </details>
    </div>
  );
}
