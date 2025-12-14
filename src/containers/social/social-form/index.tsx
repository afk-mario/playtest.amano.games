"use client";

import { useActionState } from "react";
import { Tables } from "types/supabase";

import { RefreshCcw, ImageUp, Save } from "lucide-react";

import Spinner from "components/spinner";

import "./styles.css";

export default function PlaytesterDiscordForm({
  saveAction,
  playtester,
  socialProfile,
}: {
  saveAction: (formData: FormData) => void;
  socialProfile: Tables<"social_profile">;
  playtester: Tables<"playtester">;
}) {
  return (
    <form action={saveAction}>
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
        value={socialProfile.id}
        readOnly
        hidden
      />
    </form>
  );
}
