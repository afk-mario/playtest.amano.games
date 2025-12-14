"use client";
import { useActionState } from "react";
import { Tables } from "types/supabase";

import { RefreshCcw, ImageUp, Save } from "lucide-react";
import { saveDiscord, scrapeDiscordAvatar, updateDiscord } from "../actions";

import "./styles.css";
import Spinner from "components/spinner";

export default function PlaytesterDiscordForm({
  playtester,
}: {
  playtester: Tables<"playtester"> & {
    social_profile: Tables<"social_profile">[];
  };
}) {
  const discordProfile = playtester.social_profile.find(
    (item) => item.platform === "discord",
  );

  const [, saveDiscordAction, saveDiscordPending] = useActionState(
    saveDiscord,
    false,
  );
  const [, scrapeDiscordAvatarAction, scrapeDiscordAvatarPending] =
    useActionState(scrapeDiscordAvatar, false);
  const [, updateDiscordAction, updateDiscordPending] = useActionState(
    updateDiscord,
    false,
  );
  return (
    <form action={saveDiscordAction}>
      <h3>Discord</h3>
      <input
        name="playtesterId"
        type="text"
        value={playtester.id}
        readOnly
        hidden
      />
      {discordProfile ? (
        <input
          name="discordProfileId"
          type="text"
          value={discordProfile.id}
          readOnly
          hidden
        />
      ) : null}
      {discordProfile ? (
        <label>
          <span>Display name</span>
          <input
            name="discordDisplayName"
            value={discordProfile.display_name || undefined}
            readOnly
          />
        </label>
      ) : null}
      <div className="c-discord-fields cluster">
        <label>
          <span>User id</span>
          <input
            aria-autocomplete="none"
            autoComplete="off"
            name="discordSocialId"
            defaultValue={discordProfile?.social_id || undefined}
            required
          />
        </label>

        <div className="c-discord-form-actions cluster">
          {discordProfile != null ? (
            <button
              className="c-button"
              type="submit"
              formAction={scrapeDiscordAvatarAction}
              disabled={scrapeDiscordAvatarPending}
            >
              {scrapeDiscordAvatarPending ? <Spinner /> : <ImageUp />}
            </button>
          ) : null}
          {discordProfile != null ? (
            <button
              className="c-button"
              type="submit"
              formAction={updateDiscordAction}
              disabled={updateDiscordPending}
            >
              {updateDiscordPending ? <Spinner /> : <RefreshCcw />}
            </button>
          ) : null}
          <button
            className="c-button"
            type="submit"
            disabled={saveDiscordPending}
          >
            {saveDiscordPending ? <Spinner /> : <Save />}
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
