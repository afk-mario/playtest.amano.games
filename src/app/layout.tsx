import React from "react";
import { Metadata } from "next";

import "styles/global.css";
import SiteHeader from "components/site-header";

const year = new Date().getFullYear();

export const metadata: Metadata = {
  title: "Playtesters",
  description: `Small website tro track Amano's playester feedback`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>
          <div className="wrapper">{children}</div>
        </main>
        <footer className="c-site-footer">
          <div className="wrapper">
            <span>
              © <time>{year}</time> by Amano
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
