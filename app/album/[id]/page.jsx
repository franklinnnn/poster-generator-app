"use client";
import { AlbumPoster } from "@/components/posters/album-poster";
import React from "react";

const AlbumPosterPage = () => {
  return (
    <div className="flex flex-col items-center justify-start gap-6 p-6 min-h-96">
      <AlbumPoster />
    </div>
  );
};

export default AlbumPosterPage;
