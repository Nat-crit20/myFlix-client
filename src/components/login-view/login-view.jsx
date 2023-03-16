import { useEffect, useState } from "react";

export const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Username: username,
      Password: password,
    };
    fetch("https://blooming-shore-67354.herokuapp.com/login", {
      method: POST,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(`Logged in ${data}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">
        Username:{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label htmlFor="">
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
