import { useState, useEffect, useRef } from "react";
import { handleLogin } from "./LoginLogic";

export const Login = (props) => {
  const [name, setName] = useState("");
  const nameInput = useRef();

  useEffect(() => {
    nameInput.current.focus();
  }, []);

  return (
    <div>
      <h1>Continue</h1>
      <button onClick={() => props.handleNav("landingPage")}>Back</button>
      <input
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin(name, () => props.handleNav("worldMap"));
          }
        }}
        ref={nameInput}
      />
      <button
        onClick={() => handleLogin(name, () => props.handleNav("worldMap"))}
      >
        Let's Go!
      </button>
    </div>
  );
};
