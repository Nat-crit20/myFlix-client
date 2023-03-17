import { useState } from "react";
import PropTypes from "prop-types";

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
    <form action="POST" onSubmit={handleSubmit}>
      <label htmlFor="">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label htmlFor="">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

LoginView.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
