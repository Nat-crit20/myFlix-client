import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ProfileView = ({
  user,
  deregister,
  token,
  movies,
  favoriteMovies,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Birthday: birthday,
      Email: email,
    };
    fetch(`https://blooming-shore-67354.herokuapp.com/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          alert("Update successful");
          return res.json();
        } else {
          alert("Update failed");
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const favoriteMoviesList = movies.filter((m) =>
    favoriteMovies.includes(m._id)
  );
  return (
    <>
      <h1>{user.Username}</h1>
      <Button onClick={deregister} variant="danger">
        Deregister
      </Button>
      <p>{user.Birthday}</p>
      <>
        {favoriteMoviesList.map((movie) => {
          return (
            <Col className="mb-5" key={movie._id} md={3}>
              <MovieCard movie={movie} key={movie._id} />
            </Col>
          );
        })}
      </>
      <>
        <Button variant="primary" onClick={handleShow}>
          Update Profile Info
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Form action="PUT" onSubmit={handleUpdate}>
            <Modal.Body>
              {" "}
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formUsername">
                  <Form.Label htmlFor="">Username: </Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formPassword">
                  <Form.Label htmlFor="">Password: </Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formBirthday">
                <Form.Label htmlFor="">Birthday: </Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label htmlFor="">Email: </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    </>
  );
};
