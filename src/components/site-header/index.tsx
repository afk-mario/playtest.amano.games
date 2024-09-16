import Link from "next/link";

import { createClient } from "utils/supabase/server";
import { logout } from "./actions";

import "./styles.css";

export default async function SiteHeader() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const isLoggedIn = data?.user != null && error == null;

  return (
    <header className="c-site-header">
      <div className="wrapper | cluster">
        <Link href="/" className="c-site-title">
          <h1>Playtest</h1>
        </Link>
        {isLoggedIn ? (
          <form action={logout}>
            <button>Logout</button>
          </form>
        ) : (
          <Link className="c-button" href="/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
