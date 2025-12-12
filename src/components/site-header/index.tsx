import Link from "next/link";

import { createClient } from "utils/supabase/server";
import { logout } from "./actions";
import { LogIn, LogOut } from "lucide-react";

import Logo from "svg/logo.svg";

import "./styles.css";

export default async function SiteHeader() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const isLoggedIn = data?.user != null && error == null;

  return (
    <header className="c-site-header">
      <div className="wrapper | cluster">
        <Link href="/" className="c-site-title">
          <Logo />
        </Link>
        <nav className="c-site-nav">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">Timeline</Link>
              <Link href="/dashboard/playtester">Playtesters</Link>
              <form action={logout}>
                <button>
                  <LogOut /> Logout
                </button>
              </form>
            </>
          ) : (
            <Link className="c-button" href="/login">
              <LogIn /> Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
