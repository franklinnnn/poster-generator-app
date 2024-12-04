"use client";

import Link from "next/link";
import { PiFrameCorners } from "react-icons/pi";

export const Footer = () => {
  return (
    <footer className="footer self-end bg-base-200 items-center p-6 mt-auto">
      <aside className="grid-flow-col items-center">
        <PiFrameCorners size={35} className="rotate-90" />
        <p className="flex items-center gap-1">
          ©{" "}
          <span className="font-display uppercase font-bold text-xs">
            Swatch Frame {new Date().getFullYear()}
          </span>
        </p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link href="/" className="link">
          Home
        </Link>
        <Link href="/about" className="link">
          About
        </Link>
        <Link
          href="https://github.com/franklinnnn/poster-generator-app"
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </nav>
    </footer>
  );
};
