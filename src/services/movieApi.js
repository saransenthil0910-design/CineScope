import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const BASE_URL = "https://www.omdbapi.com/";

// Search movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        type: "movie",
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Movie API Error:", error);
    throw error;
  }
};

// Get single movie details
export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: id,
        plot: "full",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Movie Details API Error:", error);
    throw error;
  }
};