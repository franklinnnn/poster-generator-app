"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { getCredits, getImages } from "@/utils/tmdb";
import { MoviePosterStyleA } from "@/components/posters/movies/style-a/movie-poster";

const MoviePage = () => {
  const params = useParams();
  const { id } = params;
  const posterRef = useRef(null);
  const [movie, setMovie] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [showEdit, setShowEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const accessToken = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN;

        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${id}`,
          params: { language: "en-US" },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };

        axios
          .request(options)
          .then((res) => {
            console.log("movie", res.data);
            setMovie(res.data);
            setEditMovie(res.data);

            getImages(res.data.id, setMovie, setEditMovie, setLoading);
            getCredits(res.data.id, setMovie, setEditMovie, setLoading);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log("Error fetching movie", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, []);
  return (
    <div className="flex flex-col items-center justify-start gap-6 p-4 min-h-96">
      {loading ? (
        "loading..."
      ) : (
        <MoviePosterStyleA movie={movie} posterRef={posterRef} />
      )}
    </div>
  );
};

export default MoviePage;
