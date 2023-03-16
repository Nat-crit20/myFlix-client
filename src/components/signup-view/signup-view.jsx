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
          Username: <input type="text" />
        </label>
        <label htmlFor="">
          Password: <input type="password" />
        </label>
        <label htmlFor="">
          Birthday: <input type="date" />
        </label>
        <label htmlFor="">
          Email: <input type="email" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
