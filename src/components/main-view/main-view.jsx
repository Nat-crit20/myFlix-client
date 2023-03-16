import { useEffect, useState } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignUpView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = JSON.parse(localStorage.getItem("token"));
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : "");
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
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }, [token]);

  if (!user) {
    return (
      <div>
        <LoginView
          onLogin={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignUpView />
      </div>
    );
  }

  if (selectedMovie) {
    let similarMovies = movies.filter(
      (movie) =>
        movie.Title !== selectedMovie.Title &&
        movie.Genre.Name === selectedMovie.Genre.Name
    );
    return (
      <div>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <br />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => {
          return (
            <MovieCard
              movie={movie}
              key={movie._id}
              handleClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          );
        })}
      </div>
    );
  }

  if (movies.length === 0) {
    return <h1>There are no movies in the list</h1>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            movie={movie}
            key={movie._id}
            handleClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
