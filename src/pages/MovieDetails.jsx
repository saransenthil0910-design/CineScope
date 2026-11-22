import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";
import { useFavorites } from "../context/FavoritesContext";
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useFavorites();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");
        setMovie(null);

        const data = await getMovieDetails(id);

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(
            data.Error || "Movie details not found."
          );
        }
      } catch (error) {
        console.error(
          "Movie Details Error:",
          error
        );

        setError(
          "Something went wrong while loading movie details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="movie-details-page">
        <div className="details-status">
          <div className="details-spinner"></div>

          <p>
            Loading movie details...
          </p>
        </div>
      </main>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <main className="movie-details-page">
        <div className="details-status">
          <p className="details-error">
            {error}
          </p>

          <Link
            to="/movies"
            className="back-movies-btn"
          >
            ← Back to Movies
          </Link>
        </div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="movie-details-page">
        <div className="details-status">
          <p className="details-error">
            Movie details not found.
          </p>

          <Link
            to="/movies"
            className="back-movies-btn"
          >
            ← Back to Movies
          </Link>
        </div>
      </main>
    );
  }

  /* =========================
     FAVORITE
  ========================= */

  const favorite = isFavorite(movie.imdbID);

  const handleFavorite = () => {
    if (favorite) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  /* =========================
     TRAILER
  ========================= */

  const trailerSearchUrl =
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      `${movie.Title} official trailer`
    )}`;

  return (
    <main className="movie-details-page">

      {/* =========================
          BACK BUTTON
      ========================= */}

      <div className="details-top">
        <Link
          to="/movies"
          className="back-link"
        >
          ← Back to Movies
        </Link>
      </div>

      {/* =========================
          DETAILS CONTAINER
      ========================= */}

      <section className="movie-details-container">

        {/* =========================
            POSTER
        ========================= */}

        <div className="details-poster">

          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/400x600?text=No+Poster"
            }
            alt={movie.Title}
          />

        </div>

        {/* =========================
            CONTENT
        ========================= */}

        <div className="details-content">

          <p className="details-small-text">
            MOVIE DETAILS
          </p>

          <h1>
            {movie.Title}
          </h1>

          {/* META */}

          <div className="movie-meta">

            <span>
              {movie.Year}
            </span>

            <span>
              {movie.Runtime}
            </span>

            <span>
              {movie.Rated}
            </span>

          </div>

          {/* RATING */}

          <div className="movie-rating">
            <span className="rating-star">
              ★
            </span>

            <span>
              {movie.imdbRating !== "N/A"
                ? movie.imdbRating
                : "N/A"}
            </span>

            <small>
              IMDb Rating
            </small>
          </div>

          {/* ACTION BUTTONS */}

          <div className="details-actions">

            <button
              type="button"
              className={`favorite-btn ${
                favorite
                  ? "favorite-active"
                  : ""
              }`}
              onClick={handleFavorite}
            >
              <span>
                {favorite
                  ? "Favorites"
                  : "Add to Favorites"}
              </span>

              <span className="heart-icon">
                {favorite ? "♥" : "♡"}
              </span>
            </button>

            <a
              href={trailerSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="trailer-btn"
            >
              <span>
                ▶
              </span>

              Watch Trailer
            </a>

          </div>

          {/* GENRE */}

          {movie.Genre !== "N/A" && (
            <p className="movie-genre">
              {movie.Genre}
            </p>
          )}

          {/* PLOT */}

          <div className="movie-story">

            <h2>
              Story
            </h2>

            <p className="movie-plot">
              {movie.Plot !== "N/A"
                ? movie.Plot
                : "No story information available."}
            </p>

          </div>

          {/* MOVIE INFORMATION */}

          <div className="movie-info-list">

            <div className="info-item">
              <strong>
                Director
              </strong>

              <span>
                {movie.Director !== "N/A"
                  ? movie.Director
                  : "Not available"}
              </span>
            </div>

            <div className="info-item">
              <strong>
                Actors
              </strong>

              <span>
                {movie.Actors !== "N/A"
                  ? movie.Actors
                  : "Not available"}
              </span>
            </div>

            <div className="info-item">
              <strong>
                Language
              </strong>

              <span>
                {movie.Language !== "N/A"
                  ? movie.Language
                  : "Not available"}
              </span>
            </div>

            <div className="info-item">
              <strong>
                Country
              </strong>

              <span>
                {movie.Country !== "N/A"
                  ? movie.Country
                  : "Not available"}
              </span>
            </div>

            <div className="info-item">
              <strong>
                Released
              </strong>

              <span>
                {movie.Released !== "N/A"
                  ? movie.Released
                  : "Not available"}
              </span>
            </div>

            <div className="info-item">
              <strong>
                Awards
              </strong>

              <span>
                {movie.Awards !== "N/A"
                  ? movie.Awards
                  : "Not available"}
              </span>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default MovieDetails;