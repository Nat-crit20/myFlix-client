import { useState } from "react";

export const SignUpView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [Email, setEmail] = useState("");

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
      <form action="POST">
        <label htmlFor="">
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label htmlFor="">
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label htmlFor="">
          Birthday:{" "}
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </label>
        <label htmlFor="">
          Email:{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
