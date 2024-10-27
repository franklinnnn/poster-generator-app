"use client";
import { SamplePosters } from "@/components/posters/sample-posters";

const MainPage = () => {
  return (
    <main className="flex flex-col items-center justify-start gap-6 p-6 min-h-96">
      <div className="text-center mb-6 max-w-4xl">
        <h1 className="font-display font-bold text-xl mb-2">
          Create Album Posters in Seconds
        </h1>
        <p>
          Welcome to SwatchFrame — the ultimate app for music lovers and design
          enthusiasts! Search your favorite albums, generate stunning posters
          featuring album covers, artist details, and tracklists, all with a
          unique color palette inspired by the album art.
        </p>
        <SamplePosters />
      </div>
    </main>
  );
};

export default MainPage;
