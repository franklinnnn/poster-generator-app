import axios from "axios";

export const searchAlbums = async (query, setResults, setLoading, setError) => {
  setLoading(true);
  setError(null);

  try {
    const tokenResponse = await axios.get("/api/spotify/token");
    const accessToken = tokenResponse.data.accessToken;
    const cacheBuster = Date.now();
    const requestUrl = `https://api.spotify.com/v1/search?q=${query}&type=album&limit=16&offset=0&cache_buster=${cacheBuster}`;

    const albumsResponse = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let results = albumsResponse.data.albums;
    const albums = results.items.filter((item) => item.album_type !== "single");

    setResults({
      query: query,
      items: albums,
    });
  } catch (error) {
    console.log("Error fetching albums:", error);
  } finally {
    setLoading(false);
  }
};

export const getGenres = async (id, setGenres, setLoading) => {
  console.log("input parametes", id);
  try {
    const tokenResponse = await axios.get("/api/spotify/token");
    const accessToken = tokenResponse.data.accessToken;
    const requestUrl = `https://api.spotify.com/v1/artists/${id}`;

    const artist = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const genres = artist.data.genres;
    setGenres(genres);
  } catch (error) {
    console.log("Error fetching genres:", error);
  } finally {
    setLoading(false);
  }
};

export const calculateAlbumLength = async (id, setAlbumLength, setLoading) => {
  try {
    const tokenResponse = await axios.get("/api/spotify/token");
    const accessToken = tokenResponse.data.accessToken;

    const requestUrl = `https://api.spotify.com/v1/albums/${id}/tracks?limit=20`;
    const tracks = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const trackDurations = tracks.data.items.map((track) => track.duration_ms);
    const albumDurationMs = trackDurations.reduce((a, b) => a + b, 0);

    let h, m, s;
    // h = Math.floor(albumDurationMs / 1000 / 60 / 60);
    m = Math.floor((albumDurationMs / 1000 / 60 / 60) * 60);
    s = Math.floor(((albumDurationMs / 1000 / 60 / 60) * 60 - m) * 60);

    s < 10 ? (s = `0${s}`) : (s = `${s}`);
    m < 10 ? (m = `0${m}`) : (m = `${m}`);
    h < 10 ? (h = `0${h}`) : (h = `${h}`);

    const length = `${m}:${s}`;

    setAlbumLength(length);
  } catch (error) {
    console.log("Error calculating album length", error);
  } finally {
    setLoading(false);
  }
};
