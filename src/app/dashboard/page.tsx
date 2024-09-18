import Link from "next/link";
import { redirect } from "next/navigation";

import "./styles.css";

import InfoPanel from "./info-panel";
import { createClient } from "utils/supabase/server";
import { PlaytesterFeedbackItem } from "components/playtester/playtester-feedback-item";

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const { data: feedbacks } = await supabase
    .from("feedback")
    .select("*,playtester(*,social_profile(*))")
    .order("id");

  return (
    <div className="stack">
      <Link href="/dashboard/playtester">Playtesters</Link>
      <InfoPanel />
      <div className="p-feedback-list stack">
        {feedbacks?.map((item) => {
          return (
            <PlaytesterFeedbackItem
              feedback={item}
              playtester={item?.playtester}
            />
          );
        })}
      </div>
    </div>
  );
}
