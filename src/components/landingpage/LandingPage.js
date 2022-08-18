export const LandingPage = (props) => {
  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={() => props.handleNav("new")}>New</button>
      <button onClick={() => props.handleNav("continue")}>Continue</button>
    </div>
  );
};
