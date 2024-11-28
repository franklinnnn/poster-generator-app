import axios from "axios";

const accessToken = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN;

export const getConfig = () => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/configuration",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  axios
    .request(options)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
};

export const searchMovies = async (query, setResults, setLoading, setError) => {
  setLoading(true);
  setError(null);

  try {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: query,
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios.request(options).then((res) => {
      console.log(res.data);
      setResults({ query: query, items: res.data.results });
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    setError("Failed to fetch movies.");
  } finally {
    setLoading(false);
  }
};

export const getImages = async (id, setMovie, setEditMovie, setLoading) => {
  try {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/images`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .request(options)
      .then((res) => {
        const images = res.data.backdrops
          .filter((item) => item.vote_count > 5 && item.vote_average > 5.24)
          .sort((a, b) => b.vote_average - a.vote_average);
        setMovie((prev) => ({ ...prev, images }));
        setEditMovie((prev) => ({ ...prev, images }));
      })
      .catch((err) => console.error(err));
  } catch (error) {
    console.log("Error fetching images:", error);
  } finally {
    setLoading(false);
  }
};

export const getCredits = async (id, setMovie, setEditMovie, setLoading) => {
  try {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/credits`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .request(options)
      .then((res) => {
        console.log("credits", res.data);
        const cast = res.data.cast.filter((cast) => cast.order <= 3);
        const director = res.data.crew.filter(
          (crew) => crew.department === "Directing"
        );
        console.log("cast", cast, "crew", director);
        setMovie((prev) => ({ ...prev, cast, director }));
        setEditMovie((prev) => ({ ...prev, cast, director }));
      })
      .catch((err) => console.error(err));
  } catch (error) {
    console.log("Error fetching credits:", error);
  } finally {
    setLoading(false);
  }
};
