import { useEffect, useState } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignUpView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

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

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://blooming-shore-67354.herokuapp.com/movies", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    setMoviesView(movies);
  }, [movies]);

  const deregister = () => {
    fetch(`https://blooming-shore-67354.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
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

  const toggleFavorite = (movieId) => {
    const favoriteIndex = userFavoriteMovies.indexOf(movieId);
    if (favoriteIndex > -1) {
      removeFavorite(movieId);
    } else {
      addToFavorite(movieId);
    }
  };

  const addToFavorite = (movieId) => {
    fetch(
      `https://blooming-shore-67354.herokuapp.com/users/${user._id}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
  const removeFavorite = (movieId) => {
    fetch(
      `https://blooming-shore-67354.herokuapp.com/users/${user._id}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
