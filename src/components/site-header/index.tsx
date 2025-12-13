import Link from "next/link";

import { createClient } from "utils/supabase/server";
import { logout } from "./actions";
import { LogOut, Users, SquareChartGantt } from "lucide-react";

import Logo from "svg/logo.svg";

import "./styles.css";

export default async function SiteHeader() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const isLoggedIn = data?.user != null && error == null;

  return (
    <header className="c-site-header">
      <div className="cluster">
        <Link href="/" className="c-site-title">
          <Logo />
        </Link>
        <nav className="c-site-nav">
          {isLoggedIn ? (
            <>
              <Link className="c-button" href="/dashboard">
                <SquareChartGantt />
                Timeline
              </Link>
              <Link className="c-button" href="/dashboard/playtester">
                <Users />
                Playtesters
              </Link>
              <form action={logout}>
                <button className="c-button">
                  <LogOut /> Logout
                </button>
              </form>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
