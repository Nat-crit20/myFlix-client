import { useEffect, useState } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignUpView } from "../signup-view/signup-view";
import { Row, Col, Button, Container, Navbar } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [selectedMovie, setSelectedMovie] = useState(null);
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

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  if (!user) {
    return (
      <Row md={6} className="justify-content-md-center">
        <Col md={6}>
          Login:
          <LoginView
            onLogin={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or Sign Up:
          <SignUpView />
        </Col>
      </Row>
    );
  }

  if (selectedMovie) {
    let similarMovies = movies.filter(
      (movie) =>
        movie.Title !== selectedMovie.Title &&
        movie.Genre.Name === selectedMovie.Genre.Name
    );
    let similarMoviesCards = similarMovies.map((movie) => {
      return (
        <Col className="mb-5" key={movie._id} md={3}>
          <MovieCard
            movie={movie}
            key={movie._id}
            handleClick={() => {
              handleMovieClick(movie);
            }}
          />
        </Col>
      );
    });
    return (
      <Row className="justify-content-md-center">
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(false)}
        />
        <br />
        <h2>Similar Movies</h2>
        {similarMoviesCards}
      </Row>
    );
  }

  if (movies.length === 0) {
    return <h1>There are no movies in the list</h1>;
  }

  return (
    <>
      <Navbar sticky="top" bg="light">
        <Container>
          <Button
            onClick={() => {
              setToken(null);
              setUser(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        </Container>
      </Navbar>
      <Row className="justify-content-md-center">
        {movies.map((movie) => {
          return (
            <Col className="mb-5" key={movie._id} md={3}>
              <MovieCard
                movie={movie}
                key={movie._id}
                handleClick={() => {
                  handleMovieClick(movie);
                }}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};
