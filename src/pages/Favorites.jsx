import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import "./Favorites.css";

function Favorites() {
  const {
    favorites,
    removeFromFavorites,
  } = useFavorites();

  return (
    <main className="favorites-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="favorites-header">

        <p className="favorites-small-text">
          YOUR COLLECTION
        </p>

        <h1>
          My <span>Favorites</span>
        </h1>

        <p className="favorites-description">
          Keep your favorite movies in one place
          and watch them whenever you want.
        </p>

        {favorites.length > 0 && (
          <div className="favorites-count">
            {favorites.length}
            {" "}
            {favorites.length === 1
              ? "Movie"
              : "Movies"}
          </div>
        )}

      </section>

      {/* =========================
          CONTENT
      ========================= */}

      <section className="favorites-content">

        {favorites.length === 0 ? (

          /* =========================
             EMPTY STATE
          ========================= */

          <div className="empty-favorites">

            <div className="empty-heart">
              ♡
            </div>

            <h2>
              No Favorites Yet
            </h2>

            <p>
              You haven't saved any movies yet.
              Explore movies and add the ones
              you love to your favorites.
            </p>

            <Link
              to="/movies"
              className="explore-btn"
            >
              Explore Movies
            </Link>

          </div>

        ) : (

          /* =========================
             FAVORITE MOVIES
          ========================= */

          <>

            <div className="favorites-top">

              <div>
                <h2>
                  Saved Movies
                </h2>

                <p>
                  Your personal movie collection
                </p>
              </div>

              <Link
                to="/movies"
                className="browse-link"
              >
                + Add More
              </Link>

            </div>

            <div className="movie-grid">

              {favorites.map((movie) => (

                <div
                  className="favorite-movie-wrapper"
                  key={movie.imdbID}
                >

                  <MovieCard
                    movie={movie}
                  />

                  <button
                    type="button"
                    className="remove-favorite-btn"
                    onClick={() =>
                      removeFromFavorites(
                        movie.imdbID
                      )
                    }
                  >
                    Remove from Favorites
                  </button>

                </div>

              ))}

            </div>

          </>

        )}

      </section>

    </main>
  );
}

export default Favorites;