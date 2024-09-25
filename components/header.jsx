"use client";
import Link from "next/link";
import { PiFrameCorners } from "react-icons/pi";

export const Header = () => {
  return (
    <div className="w-full flex justify-center bg-base-200 p-6">
      <div className=" flex justify-between items-center min-w-96">
        <Link
          href="/"
          className="flex items-center font-display font-bold text-2xl uppercase"
        >
          <PiFrameCorners size={45} className="rotate-90" />
          <div className="flex flex-col -ml-1">
            <span>Swatch</span>
            <span className="-mt-3">Frame</span>
          </div>
        </Link>
        <input
          type="checkbox"
          value="sunset"
          className="toggle theme-controller"
        />
      </div>
    </div>
  );
};
