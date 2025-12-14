import { redirect } from "next/navigation";

import "./styles.css";

import { createClient } from "utils/supabase/server";
import FeedbackItem from "containers/feedback/feedback-item";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const { data: feedbacks } = await supabase
    .from("feedback")
    .select("*,game(*),playtester(*,social_profile(*))")
    .order("id", { ascending: false });

  return (
    <div className="stack">
      <div className="p-feedback-list stack">
        {feedbacks?.map((item, i) => {
          return (
            <FeedbackItem
              key={i}
              game={item.game}
              feedback={item}
              playtester={item.playtester}
            />
          );
        })}
      </div>
    </div>
  );
}
