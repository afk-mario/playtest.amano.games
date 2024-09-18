import { Tables } from "types/supabase";

import { saveDiscord, scrapeDiscordAvatar, updateDiscord } from "../actions";

export default function PlaytesterDiscordForm({
  playtester,
}: {
  playtester: Tables<"playtester"> & {
    social_profile: Tables<"social_profile">[];
  };
}) {
  const discordProfile = playtester.social_profile.find(
    (item) => item.platform === "discord"
  );

  return (
    <form action={saveDiscord}>
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

      <div className="cluster">
        {discordProfile != null ? (
          <button type="submit" formAction={scrapeDiscordAvatar}>
            Get avatar
          </button>
        ) : null}
        {discordProfile != null ? (
          <button type="submit" formAction={updateDiscord}>
            Update
          </button>
        ) : null}
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
