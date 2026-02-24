export const WorldMap = (props) => {
  return (
    <div>
      <h1>World Map</h1>
      <button onClick={() => props.handleNav("battle")}>Battle</button>
      <button onClick={() => props.handleNav("landingPage")}>Exit</button>
    </div>
  );
};
