"use client";

import { Tables } from "types/supabase";

import { RefreshCcw, ImageUp, Save } from "lucide-react";

import Spinner from "components/spinner";

import "./styles.css";
import {
  scrapeAvatar,
  scrapeDisplayName,
  upsertSocialProfile,
} from "../actions";
import { useActionState } from "react";

export default function SocialProfileForm({
  playtester,
  socialProfile,
  platform,
}: {
  platform: string;
  socialProfile: Tables<"social_profile">;
  playtester: Tables<"playtester">;
}) {
  const [, saveAction, savePending] = useActionState(
    upsertSocialProfile,
    false
  );
  const [, scrapeAvatarAction, scrapeAvatarPending] = useActionState(
    scrapeAvatar,
    false
  );
  const [, scrapeDisplayNameAction, scrapeDisplayNamePending] = useActionState(
    scrapeDisplayName,
    false
  );

  const scrapeAvatarAvailable =
    platform === "discord" || platform === "mastodon";
  const scrapeDisplayNameAvailable =
    platform === "discord" || platform === "mastodon";
  return (
    <form action={saveAction} className="c-social-form">
      <header>
        <h3>{platform}</h3>
      </header>
      <input
        name="playtesterId"
        type="text"
        value={playtester.id}
        readOnly
        hidden
      />
      <input
        name="socialProfileId"
        type="text"
        value={socialProfile?.id || undefined}
        readOnly
        hidden
      />
      <input name="platform" type="text" value={platform} readOnly hidden />
      <div className="cluster">
        <label htmlFor="">
          <span>Display name</span>
          <input
            name="displayName"
            type="text"
            defaultValue={socialProfile?.display_name || undefined}
          />
        </label>
        <label htmlFor="">
          <span>Social ID</span>
          <input
            name="socialId"
            type="text"
            defaultValue={socialProfile?.social_id || undefined}
          />
        </label>
      </div>
      <footer className="cluster">
        {socialProfile != null && scrapeAvatarAvailable ? (
          <button
            className="c-button"
            type="submit"
            formAction={scrapeAvatarAction}
            disabled={scrapeAvatarPending}
          >
            {scrapeAvatarPending ? <Spinner /> : <ImageUp />}
          </button>
        ) : null}
        {socialProfile != null && scrapeDisplayNameAvailable ? (
          <button
            className="c-button"
            type="submit"
            formAction={scrapeDisplayNameAction}
            disabled={scrapeDisplayNamePending}
          >
            {scrapeDisplayNamePending ? <Spinner /> : <RefreshCcw />}
          </button>
        ) : null}
        <button
          className="c-button"
          type="submit"
          formAction={saveAction}
          disabled={savePending}
        >
          {savePending ? <Spinner /> : <Save />}
          Save
        </button>
      </footer>
    </form>
  );
}
