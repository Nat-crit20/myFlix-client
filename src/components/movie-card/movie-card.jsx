import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
export const MovieCard = ({ movie, toggleFavorite }) => {
  return (
    <Card className="h-100">
      <Card.Img src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <AiOutlineHeart
          className="heart"
          onClick={() => toggleFavorite(movie._id)}
        />
        <AiFillHeart
          className="heart"
          onClick={() => toggleFavorite(movie._id)}
        />
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
};
