"use client";
import {
  AlbumPoster,
  AlbumPosterLoader,
} from "@/components/posters/album-poster";
import { EditAlbumPoster } from "@/components/posters/edit-album-poster";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AlbumPosterPage = () => {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  // console.log(id);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const tokenResponse = await axios.get("/api/spotify/token");
        const accessToken = tokenResponse.data.accessToken;
        const requestUrl = `https://api.spotify.com/v1/albums/${id}`;

        const albumResponse = await axios.get(requestUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // console.log("request parameters", id);
        setAlbum(albumResponse.data);
      } catch (error) {
        console.log("Error fetching album: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, []);

  const handleEditPoster = () => {
    // do something
    console.log("editing poster");
  };

  return (
    <div className="flex flex-col items-center justify-start gap-6 p-4 min-h-96">
      {loading ? <AlbumPosterLoader /> : <AlbumPoster album={album} />}
      {loading ? <AlbumPosterLoader /> : <EditAlbumPoster album={album} />}
      <div className="flex justify-center gap-6 w-full">
        <button
          className="btn btn-primary rounded-sm"
          onClick={handleEditPoster}
        >
          Edit poster
        </button>
        <button className="btn btn-primary rounded-sm">Save poster</button>
      </div>
    </div>
  );
};

export default AlbumPosterPage;
