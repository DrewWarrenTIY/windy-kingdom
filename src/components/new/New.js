import { useState, useEffect, useRef } from "react";
import { handleNew } from "./NewLogic";

export const New = (props) => {
  const [name, setName] = useState("");
  const nameInput = useRef();
  useEffect(() => {
    nameInput.current.focus();
  }, []);

  return (
    <div>
      <h1>New</h1>
      <button onClick={() => props.handleNav("landingPage")}>Back</button>
      <input onChange={(e) => setName(e.target.value)} ref={nameInput} />

      <h2>{`Your name will be ${name}.`}</h2>

      <button onClick={() => handleNew(name, () => props.handleNav("battle"))}>
        Let's Go!
      </button>
    </div>
  );
};
