import PropTypes from "prop-types";
import { Button, Col, Row, Container } from "react-bootstrap";
import {parm}
export const MovieView = ({ movie }) => {
  return (
    <Container className="movie-view md-3">
      <Row>
        <Col>
          <img src={movie.ImagePath} alt="" />
        </Col>
      </Row>
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
      <Button variant="primary" onClick={onBackClick}>
        Back
      </Button>
    </Container>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImagePath: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
