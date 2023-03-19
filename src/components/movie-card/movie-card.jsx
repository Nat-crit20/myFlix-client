import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
export const MovieCard = ({ movie, handleClick }) => {
  return (
    <Card className="h-100">
      <Card.Img src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Button onClick={() => handleClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};
