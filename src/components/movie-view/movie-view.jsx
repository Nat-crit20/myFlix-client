import PropTypes from "prop-types";
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt="" />
      </div>
      <div className="movieTitle">
        <h1>Title: {movie.Title}</h1>
      </div>
      <div className="movieDirector">
        <h2>Director: {movie.Director.Name}</h2>
      </div>
      <div className="movieGenre">
        <p>Genre: {movie.Genre.Name}</p>
      </div>
      <div className="movieDescription">
        <p>{movie.Description}</p>
      </div>
      <div>
        <button onClick={onBackClick}>Back</button>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImagePath: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
