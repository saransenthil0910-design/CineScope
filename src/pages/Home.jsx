import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import "./Home.css";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [romanticMovies, setRomanticMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getHomeMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const [popularData, actionData, romanticData] =
          await Promise.all([
            searchMovies("Avengers"),
            searchMovies("Mission"),
            searchMovies("Love"),
          ]);

        if (popularData.Response === "True") {
          setPopularMovies(popularData.Search);
        } else {
          setPopularMovies([]);
        }

        if (actionData.Response === "True") {
          setActionMovies(actionData.Search);
        } else {
          setActionMovies([]);
        }

        if (romanticData.Response === "True") {
          setRomanticMovies(romanticData.Search);
        } else {
          setRomanticMovies([]);
        }

        if (
          popularData.Response !== "True" &&
          actionData.Response !== "True" &&
          romanticData.Response !== "True"
        ) {
          setError("Movies could not be loaded.");
        }
      } catch (error) {
        console.error("Home Movies Error:", error);

        setError(
          "Something went wrong while loading movies."
        );
      } finally {
        setLoading(false);
      }
    };

    getHomeMovies();
  }, []);

  const renderMovieSection = (title, movies) => {
    if (movies.length === 0) {
      return null;
    }

    return (
      <section className="movie-section">
        <div className="section-header">
          <h2>{title}</h2>

          <Link
            to="/movies"
            className="view-all-link"
          >
            View All
          </Link>
        </div>

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <main className="home">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero-section">
        <div className="hero-content">

          <p className="hero-small-text">
            WELCOME TO CINESCOPE
          </p>

          <h1>
            Discover Your Next
            <span> Favorite Movie</span>
          </h1>

          <p className="hero-description">
            Explore popular movies, action-packed films,
            romantic stories and more. Find something
            perfect to watch.
          </p>

          <div className="hero-buttons">

            <Link
              to="/movies"
              className="hero-btn"
            >
              Explore Movies
            </Link>

            <Link
              to="/favorites"
              className="hero-btn secondary-btn"
            >
              View Favorites
            </Link>

          </div>
        </div>
      </section>

      {/* =========================
          MOVIE SECTIONS
      ========================= */}

      {loading && (
        <div className="home-status-container">
          <p className="home-status-message">
            Loading movies...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="home-status-container">
          <p className="home-error-message">
            {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <>

          {/* POPULAR MOVIES */}

          {renderMovieSection(
            "Popular Movies",
            popularMovies
          )}

          {/* ACTION MOVIES */}

          {renderMovieSection(
            "Action Movies",
            actionMovies
          )}

          {/* ROMANTIC MOVIES */}

          {renderMovieSection(
            "Romantic Movies",
            romanticMovies
          )}

        </>
      )}

    </main>
  );
}

export default Home;