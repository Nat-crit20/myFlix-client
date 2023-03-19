import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

export const LoginView = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://blooming-shore-67354.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLogin(data.user, data.token);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Form action="POST" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label htmlFor="">Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label htmlFor="">Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

LoginView.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
