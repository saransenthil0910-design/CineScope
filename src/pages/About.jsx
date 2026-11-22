import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <main className="about-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="about-hero">

        <p className="about-small-text">
          ABOUT CINESCOPE
        </p>

        <h1>
          Discover Movies.
          <span> Find Your Next Favorite.</span>
        </h1>

        <p className="about-description">
          CineScope is a movie discovery platform built to
          help movie lovers search, explore, discover and
          save movies they love in one simple place.
        </p>

        <div className="about-buttons">

          <Link
            to="/movies"
            className="about-primary-btn"
          >
            Explore Movies
          </Link>

          <Link
            to="/favorites"
            className="about-secondary-btn"
          >
            My Favorites
          </Link>

        </div>

      </section>

      {/* =========================
          FEATURES
      ========================= */}

      <section className="about-features">

        <div className="about-section-heading">

          <p>
            WHAT YOU CAN DO
          </p>

          <h2>
            Everything You Need
            <span> to Discover Movies</span>
          </h2>

        </div>

        <div className="about-feature-grid">

          <div className="about-card">

            <div className="about-card-icon">
              🎬
            </div>

            <h3>
              Discover Movies
            </h3>

            <p>
              Explore movies and discover new films
              from different genres and years.
            </p>

          </div>

          <div className="about-card">

            <div className="about-card-icon">
              🔍
            </div>

            <h3>
              Search & Explore
            </h3>

            <p>
              Search for your favorite movies and
              quickly find detailed information about them.
            </p>

          </div>

          <div className="about-card">

            <div className="about-card-icon">
              ❤️
            </div>

            <h3>
              Save Favorites
            </h3>

            <p>
              Save movies you love and keep your
              personal collection available anytime.
            </p>

          </div>

          <div className="about-card">

            <div className="about-card-icon">
              ⭐
            </div>

            <h3>
              Movie Ratings
            </h3>

            <p>
              View IMDb ratings and important movie
              information before deciding what to watch.
            </p>

          </div>

        </div>

      </section>

      {/* =========================
          HOW IT WORKS
      ========================= */}

      <section className="how-section">

        <div className="about-section-heading">

          <p>
            HOW IT WORKS
          </p>

          <h2>
            Find Your Movie in
            <span> Three Simple Steps</span>
          </h2>

        </div>

        <div className="steps-grid">

          <div className="step-card">

            <span className="step-number">
              01
            </span>

            <h3>
              Search
            </h3>

            <p>
              Search for a movie using the Movies page.
            </p>

          </div>

          <div className="step-card">

            <span className="step-number">
              02
            </span>

            <h3>
              Explore
            </h3>

            <p>
              Open a movie to view its poster,
              rating, story, cast and other details.
            </p>

          </div>

          <div className="step-card">

            <span className="step-number">
              03
            </span>

            <h3>
              Save
            </h3>

            <p>
              Add movies you love to your Favorites
              and access them whenever you want.
            </p>

          </div>

        </div>

      </section>

      {/* =========================
          TECHNOLOGY
      ========================= */}

      <section className="technology-section">

        <div className="technology-content">

          <div className="technology-text">

            <p className="about-small-text">
              BUILT WITH MODERN TECHNOLOGY
            </p>

            <h2>
              Simple.
              <span> Fast. Responsive.</span>
            </h2>

            <p>
              CineScope is built using modern frontend
              technologies with a focus on clean UI,
              reusable components, API integration and
              responsive design.
            </p>

          </div>

          <div className="technology-list">

            <span>
              React
            </span>

            <span>
              React Router
            </span>

            <span>
              Axios
            </span>

            <span>
              Context API
            </span>

            <span>
              LocalStorage
            </span>

            <span>
              OMDb API
            </span>

            <span>
              CSS
            </span>

            <span>
              Vite
            </span>

          </div>

        </div>

      </section>

      {/* =========================
          CTA
      ========================= */}

      <section className="about-cta">

        <h2>
          Ready to Discover
          <span> Your Next Movie?</span>
        </h2>

        <p>
          Start exploring movies and build your
          personal favorites collection.
        </p>

        <Link
          to="/movies"
          className="cta-btn"
        >
          Start Exploring
        </Link>

      </section>

    </main>
  );
}

export default About;