import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

export const SignUpView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Birthday: birthday,
      Email: email,
    };
    fetch("https://blooming-shore-67354.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        alert("Sign up successful");
        window.location.reload();
      } else {
        alert("Sign up failed");
      }
    });
  };

  return (
    <div>
      <Form action="POST" onSubmit={handleSubmit}>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
