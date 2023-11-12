import { Button, Col, Row, Container, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { APP_API } from "../../constants";

/**
 * Movie View
 * @component
 */
export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  return (
    <Container className="movie-view md-3">
      <Col>
        <img src={movie.ImagePath} alt="" />
      </Col>
      <Col>
        <Row>
          <Col className="movieTitle">
            <h1>Title: {movie.Title}</h1>
          </Col>
        </Row>
        <Row>
          <Col className="movieDirector">
            <h2>Director: {movie.Director.Name}</h2>
          </Col>
        </Row>
        <Row>
          <Col className="movieGenre">
            <p>Genre: {movie.Genre.Name}</p>
          </Col>
        </Row>
        <Row>
          <Col className="movieDescription">
            <p>{movie.Description}</p>
          </Col>
        </Row>
        <Link to={`/`}>
          <Button variant="primary">Back</Button>
        </Link>
      </Col>
    </Container>
  );
};
