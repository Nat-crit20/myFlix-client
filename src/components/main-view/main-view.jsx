import { useEffect, useState } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignUpView } from "../signup-view/signup-view";
import { GalleryView } from "../gallery-view/gallery-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import { APP_API } from "../../constants";

/**
 * Main View
 * @component
 */
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [userFavoriteMovies, setUserFavoriteMovies] = useState(
    user ? [...user.FavoriteMovies] : []
  );
  const [movieView, setMoviesView] = useState([]);
  const [gallery, setGallery] = useState([]);

  /**
   * Checks if there is a token in the local storage
   * Makes an API request to get all of the movies
   * Then populates the movies state
   */
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${APP_API}/movies`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin":
          "http://my-flix-api-332483673.eu-central-1.elb.amazonaws.com/",
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error(error);
        setUser(null);
        setToken(null);
      });
  }, [token]);

  /**
   * when the movie list changes what is being shown also changes
   */
  useEffect(() => {
    setMoviesView(movies);
  }, [movies]);

  useEffect(() => {
    fetch(`${APP_API}/list-images`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin":
          "http://my-flix-api-332483673.eu-central-1.elb.amazonaws.com/",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const newGallery = data.Contents.map((image) => {
          return image.Key;
        });
        setGallery(newGallery);
        console.log(gallery);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  /**
   * Makes an API delete request to remove a user
   * Clears the user and token states
   * Clears the local storage
   */
  const deregister = () => {
    fetch(`${APP_API}/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin":
          "http://my-flix-api-332483673.eu-central-1.elb.amazonaws.com/",
      },
    })
      .then((res) => {
        alert(`Successfully deregistered`);
        setUser(null);
        setToken(null);
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Toggles the movie to be in the list of favorites or remove from list
   * @param {*} movieId the id of the movie
   */
  const toggleFavorite = (movieId) => {
    const favoriteIndex = userFavoriteMovies.indexOf(movieId);
    if (favoriteIndex > -1) {
      removeFavorite(movieId);
    } else {
      addToFavorite(movieId);
    }
  };

  /**
   * Adds a movie to the list of favorites
   * Makes an API post request to add a users favorites
   * Update the local storage for the user
   * Update the state for favorite movie
   * @param {*} movieId the id of the movie
   */
  const addToFavorite = (movieId) => {
    fetch(`${APP_API}/users/${user._id}/movies/${movieId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin":
          "http://my-flix-api-332483673.eu-central-1.elb.amazonaws.com/",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
        setUserFavoriteMovies(res.FavoriteMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Removes a movie to the list of favorites
   * Makes an API delete request to remove a users favorites
   * Update the local storage for the user
   * Update the state for favorite movie
   * @param {*} movieId the id of the movie
   */
  const removeFavorite = (movieId) => {
    fetch(`${APP_API}/users/${user._id}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin":
          "http://my-flix-api-332483673.eu-central-1.elb.amazonaws.com/",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
        setUserFavoriteMovies(res.FavoriteMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Sets the what movies are shown depending on the string
   * @param {*} input string for a movie search
   */
  const filter = (input) => {
    setMoviesView(
      movies.filter((m) => {
        return m.Title.toLowerCase().includes(input.toLowerCase());
      })
    );
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        onFilter={filter}
      />
      <Container className="my-flix">
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignUpView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLogin={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <h1>There are no movies in the list</h1>
                  ) : (
                    <Col md={8}>
                      <MovieView movies={movies} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <h1>There are no movies in the list</h1>
                  ) : (
                    <>
                      {movieView.map((movie) => {
                        return (
                          <Col className="mb-5" key={movie._id} md={3}>
                            <MovieCard
                              movie={movie}
                              key={movie._id}
                              toggleFavorite={toggleFavorite}
                              favoriteMovies={userFavoriteMovies}
                            />
                          </Col>
                        );
                      })}
                    </>
                  )}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to={"/login"} replace />
                  ) : (
                    <Col>
                      <ProfileView
                        user={user}
                        deregister={deregister}
                        token={token}
                        movies={movies}
                        favoriteMovies={userFavoriteMovies}
                        toggleFavorite={toggleFavorite}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/gallery"
              element={
                <>
                  <>
                    {!user ? (
                      <Navigate to={"/login"} replace />
                    ) : (
                      <Col>
                        <GalleryView
                          gallery={gallery}
                          addImage={(imageName) => {
                            setGallery((prevGallery) => [
                              ...prevGallery,
                              imageName,
                            ]);
                          }}
                        />
                      </Col>
                    )}
                  </>
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
