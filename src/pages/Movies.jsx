import { useState } from "react";
import { searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import "./Movies.css";

function Movies() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();

    const searchValue = search.trim();

    if (!searchValue) {
      setError("Please enter a movie name.");
      setMovies([]);
      setTotalResults(0);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMovies([]);
      setPage(1);

      const data = await searchMovies(searchValue, 1);

      if (data.Response === "True") {
        setMovies(data.Search || []);
        setTotalResults(Number(data.totalResults) || 0);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || "No movies found.");
      }
    } catch (error) {
      console.error("Movie Search Error:", error);

      setMovies([]);
      setTotalResults(0);
      setError(
        "Something went wrong while searching. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const changePage = async (newPage) => {
    if (
      newPage < 1 ||
      newPage > totalPages ||
      !search.trim()
    ) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await searchMovies(
        search.trim(),
        newPage
      );

      if (data.Response === "True") {
        setMovies(data.Search || []);
        setPage(newPage);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        setError(data.Error || "No movies found.");
      }
    } catch (error) {
      console.error("Pagination Error:", error);

      setError(
        "Something went wrong while loading this page."
      );
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <main className="movies-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="movies-header">

        <p className="movies-small-text">
          EXPLORE CINESCOPE
        </p>

        <h1>
          Find Your <span>Movie</span>
        </h1>

        <p className="movies-description">
          Search for your favorite movies and discover
          something new to watch.
        </p>

        {/* =========================
            SEARCH FORM
        ========================= */}

        <form
          className="search-form"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search movie name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              if (error) {
                setError("");
              }
            }}
          />

          <button type="submit">
            Search
          </button>
        </form>

      </section>

      {/* =========================
          RESULTS
      ========================= */}

      <section className="movies-results">

        {/* LOADING */}

        {loading && (
          <div className="movies-status">
            <div className="loading-spinner"></div>

            <p>
              Loading movies...
            </p>
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="movies-status">
            <p className="error-message">
              {error}
            </p>
          </div>
        )}

        {/* INITIAL STATE */}

        {!loading &&
          !error &&
          movies.length === 0 && (
            <div className="movies-status">
              <h2>
                Search for a Movie
              </h2>

              <p>
                Enter a movie name above to start
                exploring.
              </p>
            </div>
          )}

        {/* MOVIE RESULTS */}

        {!loading && movies.length > 0 && (
          <>
            <div className="results-top">

              <h2>
                Search Results
              </h2>

              <p>
                {totalResults} movies found
              </p>

            </div>

            <div className="movie-grid">

              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                />
              ))}

            </div>

            {/* =========================
                PAGINATION
            ========================= */}

            {totalPages > 1 && (
              <div className="pagination">

                <button
                  type="button"
                  disabled={page === 1 || loading}
                  onClick={() =>
                    changePage(page - 1)
                  }
                >
                  ← Previous
                </button>

                <div className="page-info">
                  <span>
                    Page
                  </span>

                  <strong>
                    {page}
                  </strong>

                  <span>
                    of {totalPages}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={
                    page === totalPages ||
                    loading
                  }
                  onClick={() =>
                    changePage(page + 1)
                  }
                >
                  Next →
                </button>

              </div>
            )}

          </>
        )}

      </section>

    </main>
  );
}

export default Movies;