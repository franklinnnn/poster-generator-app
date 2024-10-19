"use client";
import ResultProvider from "@/components/results-context";
import { Search } from "@/components/search";
import Image from "next/image";
import Link from "next/link";

const MainPage = () => {
  return (
    <ResultProvider>
      <main className="flex flex-col items-center justify-start gap-6 p-6 min-h-96">
        <div className="text-center mb-6 max-w-4xl">
          <h1 className="font-display font-bold text-xl mb-2">
            Create Album Posters in Seconds
          </h1>
          <p>
            Welcome to SwatchFrame — the ultimate app for music lovers and
            design enthusiasts! Search your favorite albums, generate stunning
            posters featuring album covers, artist details, and tracklists, all
            with a unique color palette inspired by the album art.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
            <Link
              href="/album/79CDvmQOwJBEpd6gL6zgN9"
              className="relative md:w-72 aspect-[2/3]"
            >
              <Image src="/landing/poster-a.png" alt="Poster A" layout="fill" />
            </Link>
            <Link
              href="/album/4KjbNbnTnJ97kZgQkOHr6v"
              className="relative md:w-72 aspect-[2/3]"
            >
              <Image src="/landing/poster-b.png" alt="Poster B" layout="fill" />
            </Link>
            <Link
              href="/album/1A2GTWGtFfWp7KSQTwWOyo"
              className="relative md:w-72 aspect-[2/3]"
            >
              <Image src="/landing/poster-c.png" alt="Poster C" layout="fill" />
            </Link>
          </div>
        </div>
      </main>
    </ResultProvider>
  );
};

export default MainPage;
